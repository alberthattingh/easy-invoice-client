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
import MultiSelectionBox from '../../shared/components/multi-selection-box';
import { SelectableItem } from '../../shared/models/selectable-item';
import CustomDatePicker from '../../shared/components/custom-date-picker';
import { Snackbar, TextInput } from 'react-native-paper';
import * as Sharing from 'expo-sharing';
import { createNewInvoice, downloadInvoice } from '../../services/invoice.service';
import StudentModel from '../../shared/models/student-model';
import { CreatedInvoice } from '../../shared/models/invoice-models';

interface Props {
    visible: boolean;
    setVisible: (value: boolean) => void;
    myStudents: StudentModel[];
    newInvoiceCallback: (invoice: CreatedInvoice) => void;
}

export default function NewInvoiceModal(props: Props) {
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
                return downloadInvoice(invoice.invoiceUrl);
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
