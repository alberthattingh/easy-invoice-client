import React, { useState } from 'react';
import { ActivityIndicator, Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import NewLessonModalPropsModel from '../../models/NewLessonModalPropsModel';
import ModalSelector, { IOption } from 'react-native-modal-selector';
import StudentModel from '../../models/StudentModel';
import { combineDateAndTime } from '../../services/DateService';
import LessonModel from '../../models/LessonModel';
import { addNewLesson } from '../../services/LessonService';
import CustomDatePicker from '../shared/CustomDatePicker';
import CustomTimePicker from '../shared/CustomTimePicker';
import { TimeObjectModel } from '../../models/TimeObjectModel';

function NewLessonModal(props: NewLessonModalPropsModel) {
    const { visible, setVisible, students, newLessonCallback } = props;
    const studentData = students.map((s) => {
        return {
            key: s.studentId ?? 0,
            label: `${s.firstName} ${s.lastName}`,
        };
    });
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedStudent, setSelectedStudent] = useState<StudentModel>();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<TimeObjectModel>({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
    });
    const [duration, setDuration] = useState<number>(1);

    const handleStudentSelect = (option: IOption) => {
        const student = students.find((s) => s.studentId === option.key);
        setSelectedStudent(student);
        console.log(student);
        console.log(selectedStudent);
        setTimeout(() => console.log(selectedStudent), 5000);
    };

    const handleDurationChange = (text: string) => {
        const d = Number(text);
        if (Number.isNaN(d)) {
            return; // TODO: Show error message
        }
        setDuration(d);
    };

    const onCancel = () => {
        setSelectedStudent(undefined);
        setVisible(false);
    };

    const onSave = () => {
        if (selectedStudent === undefined || selectedStudent === null) {
            return; // TODO: Show error message
        }
        if (duration === undefined || duration === null || duration === 0) {
            return; // TODO: Show error message
        }
        setLoading(true);

        const datetime = combineDateAndTime(selectedDate, selectedTime);
        const newLesson: LessonModel = {
            lessonDate: datetime,
            studentId: selectedStudent.studentId ?? -1,
            duration: duration,
        };
        console.log(newLesson);

        addNewLesson(newLesson)
            .then((response) => response.data)
            .then((lesson) => {
                console.log(lesson);
                newLessonCallback(lesson);
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
        <Modal
            style={styles.modal}
            animationType={'slide'}
            presentationStyle={'formSheet'}
            visible={visible}
        >
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
                        selectedKey={selectedStudent === undefined ? '' : selectedStudent.studentId}
                        onChange={(option) => handleStudentSelect(option)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <CustomDatePicker
                        label="Date"
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </View>
                <View style={styles.formGroup}>
                    <CustomTimePicker
                        label="Time"
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text>Duration</Text>
                    <View style={styles.durationInputGroup}>
                        <TextInput
                            style={styles.durationInput}
                            defaultValue={'1'}
                            keyboardType={'numeric'}
                            onChangeText={(text) => handleDurationChange(text)}
                        />
                        <Text style={styles.measure}>hours</Text>
                    </View>
                </View>
            </View>
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
