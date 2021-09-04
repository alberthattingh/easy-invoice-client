import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Keyboard, Modal, StyleSheet, Text, View } from 'react-native';
import NewLessonModalPropsModel from '../../models/NewLessonModalPropsModel';
import ModalSelector, { IOption } from 'react-native-modal-selector';
import StudentModel from '../../models/StudentModel';
import { combineDateAndTime } from '../../services/DateService';
import LessonModel from '../../models/LessonModel';
import { addNewLesson } from '../../services/LessonService';
import CustomDatePicker from '../shared/CustomDatePicker';
import CustomTimePicker from '../shared/CustomTimePicker';
import { TimeObjectModel } from '../../models/TimeObjectModel';
import { Snackbar, TextInput } from 'react-native-paper';

function NewLessonModal(props: NewLessonModalPropsModel) {
    const { visible, setVisible, students, newLessonCallback, initialDate } = props;
    const studentData = students.map((s) => {
        return {
            key: s.studentId ?? 0,
            label: `${s.firstName} ${s.lastName}`,
        };
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');

    const [selectedStudent, setSelectedStudent] = useState<StudentModel>();
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
    const [selectedTime, setSelectedTime] = useState<TimeObjectModel>({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
    });
    const [duration, setDuration] = useState<number>(1);

    useEffect(() => {
        setSelectedDate(initialDate);
    }, [initialDate]);

    const handleStudentSelect = (option: IOption) => {
        const student = students.find((s) => s.studentId === option.key);
        setSelectedStudent(student);
    };

    const handleDurationChange = (text: string) => {
        const d = Number(text);
        if (Number.isNaN(d)) {
            setSnackMessage('Invalid duration');
            setShowSnackBar(true);
            return;
        }
        setDuration(d);
    };

    const onCancel = () => {
        setSelectedStudent(undefined);
        setVisible(false);
    };

    const onSave = () => {
        Keyboard.dismiss();

        if (!selectedStudent) {
            setSnackMessage('Please select a student');
            setShowSnackBar(true);
            return;
        }
        if (!duration) {
            setSnackMessage('Please enter a valid duration');
            setShowSnackBar(true);
            return;
        }
        setLoading(true);

        const datetime = combineDateAndTime(selectedDate, selectedTime);
        const newLesson: LessonModel = {
            lessonDate: datetime,
            studentId: selectedStudent.studentId ?? -1,
            duration: duration,
        };

        addNewLesson(newLesson)
            .then((response) => response.data)
            .then((lesson) => {
                newLessonCallback(lesson);
            })
            .catch((error) => {
                setSnackMessage('An error occurred. Could not create entry.');
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
            <View style={styles.mainForm}>
                <View style={styles.formGroup}>
                    <Text>Student</Text>
                    <ModalSelector
                        data={studentData}
                        initValue={'Select a student'}
                        selectedKey={!selectedStudent ? '' : selectedStudent.studentId}
                        onChange={(option) => handleStudentSelect(option)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <CustomDatePicker label="Date" selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </View>
                <View style={styles.formGroup}>
                    <CustomTimePicker label="Time" selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                </View>
                <View style={styles.formGroup}>
                    <TextInput
                        label="Duration"
                        mode="outlined"
                        onChangeText={(duration) => handleDurationChange(duration)}
                        keyboardType="numeric"
                        defaultValue="1"
                        right={<TextInput.Affix text="hours" />}
                    />
                </View>
            </View>
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
    mainForm: {
        marginTop: 25,
        paddingHorizontal: 10,
        justifyContent: 'space-evenly',
    },
    formGroup: {
        marginBottom: 20,
    },
    durationInputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    durationInput: {
        borderBottomWidth: 1,
        flex: 3,
        textAlign: 'center',
    },
    measure: {
        flex: 1,
        marginLeft: 10,
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

export default NewLessonModal;
