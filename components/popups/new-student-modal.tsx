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
import React, { useState } from 'react';
import StudentModel from '../../shared/models/student-model';
import { addNewStudent } from '../../services/student.service';
import { Snackbar, TextInput } from 'react-native-paper';

interface Props {
    visible: boolean;
    setVisible: (value: boolean) => void;
    newStudentCallback: (student: StudentModel) => void;
}

export default function NewStudentModal(props: Props) {
    const { visible, setVisible, newStudentCallback } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');

    const [name, setName] = useState<string>();
    const [surname, setSurname] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [cell, setCell] = useState<string>();
    const [fee, setFee] = useState<number>();

    const onCancel = () => {
        setVisible(false);
    };

    const handleFeeInput = (value: string) => {
        const fee = Number(value);
        if (Number.isNaN(fee)) {
            setSnackMessage('Invalid rate');
            setShowSnackBar(true);
            return;
        }
        setFee(fee);
    };

    const onSave = () => {
        Keyboard.dismiss();

        if (!name) {
            setSnackMessage('Name is required');
            setShowSnackBar(true);
            return;
        }
        if (!surname) {
            setSnackMessage('Surname is required');
            setShowSnackBar(true);
            return; //
        }
        if (!fee) {
            setSnackMessage('A standard rate for this student is required');
            setShowSnackBar(true);
            return;
        }
        setLoading(true);

        const newStudent: StudentModel = {
            firstName: name,
            lastName: surname,
            feePayable: fee,
        };

        if (email) {
            newStudent.email = email;
        }
        if (cell) {
            newStudent.cell = cell;
        }

        addNewStudent(newStudent)
            .then((response) => response.data)
            .then((student) => {
                newStudentCallback(student);
            })
            .catch((error) => {
                setSnackMessage('An error occurred. Could not add student.');
                setShowSnackBar(true);
            })
            .finally(() => {
                setLoading(false);
                setVisible(false);
            });
    };

    return (
        <Modal style={styles.modal} animationType={'slide'} presentationStyle={'formSheet'} visible={visible}>
            <View style={styles.actionBar}>
                <Button title={'Cancel'} onPress={onCancel} />
                <Button title={'Save'} onPress={onSave} />
            </View>
            <KeyboardAvoidingView behavior={'padding'} style={styles.kav}>
                <ScrollView style={styles.mainForm}>
                    <View style={styles.formGroup}>
                        <TextInput mode="outlined" onChangeText={(value) => setName(value)} label="Name" />
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput mode="outlined" onChangeText={(value) => setSurname(value)} label="Surname" />
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput mode="outlined" onChangeText={(value) => setEmail(value)} label="Email" />
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput mode="outlined" onChangeText={(value) => setCell(value)} label="Cell" />
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput
                            mode="outlined"
                            left={<TextInput.Affix text="R" />}
                            keyboardType={'numeric'}
                            onChangeText={(value) => handleFeeInput(value)}
                            label="Hourly Rate"
                        />
                    </View>
                    <View style={styles.empty} />
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
    },
    formGroup: {
        marginBottom: 20,
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
