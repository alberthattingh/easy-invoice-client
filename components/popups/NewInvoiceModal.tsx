import React, { useState } from 'react';
import {
    ActivityIndicator,
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { CreateInvoiceModalPropsModel } from '../../models/InvoiceModels';
import MultiSelectionBox from '../shared/MultiSelectionBox';
import { SelectableItem } from '../../models/MultiSelectionBoxPropsModel';
import CustomDatePicker from '../shared/CustomDatePicker';
import { Snackbar, TextInput } from 'react-native-paper';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import { createNewInvoice } from '../../services/InvoiceService';
import StudentModel from '../../models/StudentModel';
import HandlebarsService from '../../services/HandlebarsService';
const Handlebars = require('react-native-handlebars');

export default function NewInvoiceModal(props: CreateInvoiceModalPropsModel) {
    const { visible, setVisible, myStudents, newInvoiceCallback } = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');

    const [selectedStudents, setSelectedStudents] = useState<SelectableItem[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');

    const selectableStudents = myStudents.map((student) => ({
        label: `${student.firstName} ${student.lastName}`,
        key: Number(student.studentId),
        value: student,
    }));

    const createPdf = async (html: string, fileName: string) => {
        const options: Print.FilePrintOptions = {
            html,
        };

        try {
            const { uri } = await Print.printToFileAsync(options);
            return uri;
        } catch (err) {
            console.error(err);
        }
    };

    const onCancel = () => {
        setVisible(false);
    };

    const onSave = async () => {
        Keyboard.dismiss();

        if (!selectedStudents.length) {
            setSnackMessage('Please select at least one student');
            setShowSnackBar(true);
            return;
        }
        setLoading(true);

        const asset = Asset.fromModule(require('../../assets/templates/InvoiceTemplate1.html'));
        await asset.downloadAsync(); // Optional, saves file into cache
        const file = await fetch(asset.uri);

        HandlebarsService.registerHelpers();
        const template = Handlebars.compile((await file.text()) as string);

        createNewInvoice({
            description,
            startDate,
            endDate,
            studentIds: selectedStudents
                .filter((item) => !!(item.value as StudentModel).studentId)
                .map((item) => (item.value as StudentModel).studentId as number),
        })
            .then((response) => response.data)
            .then((invoice) => {
                newInvoiceCallback(invoice);

                const studentNames = invoice.lessons.map((lesson) => lesson.student?.firstName);
                const fileName = `${studentNames
                    .filter((name, index) => studentNames.indexOf(name) === index)
                    .join('&')}_${invoice.createdDate.toString()}`;

                const html = template(invoice);
                return createPdf(html, fileName);
            })
            .then(async (uri) => {
                if (uri && (await Sharing.isAvailableAsync())) {
                    await Sharing.shareAsync(uri);
                }
            })
            .catch((error) => {
                setSnackMessage('An error occurred. Could not generate invoice.');
                setShowSnackBar(true);
            })
            .finally(() => setLoading(false));
    };

    return (
        <Modal style={styles.modal} animationType={'slide'} presentationStyle={'formSheet'} visible={visible}>
            <View style={styles.actionBar}>
                <Button title={'Cancel'} onPress={onCancel} />
                <Button title={'Generate'} onPress={onSave} />
            </View>
            <KeyboardAvoidingView behavior={'padding'} style={styles.kav}>
                <ScrollView>
                    <View style={styles.mainForm}>
                        <View style={styles.formGroup}>
                            <MultiSelectionBox
                                label="Students"
                                list={selectableStudents}
                                selected={selectedStudents}
                                setSelected={setSelectedStudents}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <CustomDatePicker
                                label="Start date"
                                selectedDate={startDate}
                                setSelectedDate={setStartDate}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <CustomDatePicker label="End date" selectedDate={endDate} setSelectedDate={setEndDate} />
                        </View>
                        <View style={styles.formGroup}>
                            <TextInput
                                mode="outlined"
                                label="Description"
                                onChangeText={(text) => setDescription(text)}
                            />
                        </View>
                        <View style={styles.empty} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
            )}
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                action={{
                    label: 'OK',
                    onPress: () => setShowSnackBar(false),
                }}
            >
                {snackMessage}
            </Snackbar>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {},
    actionBar: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    kav: {
        flex: 1,
    },
    mainForm: {
        marginTop: 25,
        paddingHorizontal: 50,
        justifyContent: 'flex-end',
    },
    formGroup: {
        marginBottom: 25,
    },
    empty: {
        height: 25,
    },
    textInput: {
        borderColor: 'lightgrey',
        borderBottomWidth: 1,
        padding: 10,
    },
    loader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        opacity: 0.5,
    },
});
