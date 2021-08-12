import {
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useState } from 'react';
import NewStudentModalPropsModel from '../../models/NewStudentModalPropsModel';
import StudentModel from '../../models/StudentModel';
import { addNewStudent } from '../../services/StudentService';

export default function NewStudentModal(props: NewStudentModalPropsModel) {
    const { visible, setVisible, newStudentCallback } = props;
    const [loading, setLoading] = useState<boolean>(false);

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
            return; // TODO: Show error message
        }
        setFee(fee);
    };

    const onSave = () => {
        if (name === undefined || name === null) {
            return; // TODO: Show error message
        }
        if (surname === undefined || surname === null) {
            return; // TODO: Show error message
        }
        if (fee === undefined || fee === null) {
            return; // TODO: Show error message
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
                console.log(student);
                newStudentCallback(student);
            })
            .catch((error) => {
                console.log(error);
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
                <View style={styles.mainForm}>
                    <View style={styles.formGroup}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(value) => setName(value)}
                            placeholder={'Name'}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(value) => setSurname(value)}
                            placeholder={'Surname'}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(value) => setEmail(value)}
                            placeholder={'Email'}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(value) => setCell(value)}
                            placeholder={'Cell'}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput
                            style={styles.textInput}
                            keyboardType={'numeric'}
                            onChangeText={(value) => handleFeeInput(value)}
                            placeholder={'Hourly Fee'}
                        />
                    </View>
                    <View style={styles.empty} />
                </View>
            </KeyboardAvoidingView>
            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
            )}
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
