import React, {useState} from "react";
import {ActivityIndicator, Button, Modal, Platform, StyleSheet, Text, TextInput, View} from "react-native";
import NewLessonModalPropsModel from "../../models/NewLessonModalPropsModel";
import ModalSelector, {IOption} from "react-native-modal-selector";
import StudentModel from "../../models/StudentModel";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {combineDateAndTime} from "../../services/DateService";
import LessonModel from "../../models/LessonModel";
import {addNewLesson} from "../../services/LessonService";

function NewLessonModal(props: NewLessonModalPropsModel) {
    const {visible, setVisible, students} = props;
    const studentData = students.map(s => {
        return {
            key: s.studentId,
            label: `${s.firstName} ${s.lastName}`
        };
    });
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedStudent, setSelectedStudent] = useState<StudentModel>();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<Date>(new Date());
    const [duration, setDuration] = useState<number>(0);

    const handleStudentSelect = (option: IOption) => {
        console.log(`${option.label} was selected with key ${option.key}`);
        const student = students.find((s) => s.studentId === option.key);

        setSelectedStudent(student);
    };

    const handleDateSelection = (date: Date | undefined) => {
        const currentDate = date || selectedDate;
        setSelectedDate(currentDate);
    };

    const handleTimeSelection = (time: Date | undefined) => {
        const currentTime = time || selectedTime;
        setSelectedTime(currentTime);
    };

    const handleDurationChange = (text: string) => {
        const d = Number(text);
        if (Number.isNaN(d)) {
            return; // TODO: Show error message
        }
        setDuration(d);
    };

    const onCancel = () => {
        setVisible(false);
    };

    const onSave = () => {
        // API call
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
            studentId: selectedStudent.studentId,
            duration: duration
        };

        addNewLesson(newLesson)
            .then((response) => response.data)
            .then(lesson => {
                console.log(lesson);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
                setVisible(false);
            });
    };

    return (
        <Modal animationType={'slide'} presentationStyle={"formSheet"} visible={visible}>
            <View style={styles.actionBar}>
                <Button title={'Cancel'} onPress={onCancel}/>
                <Button title={'Save'} onPress={onSave}/>
            </View>
            <View style={styles.mainForm}>
                <View style={styles.formGroup}>
                    <Text>Student</Text>
                    <ModalSelector data={studentData}
                                   initValue={'Select a student'}
                                   onChange={(option) => handleStudentSelect(option)}/>
                </View>
                <View style={styles.formGroup}>
                    <Text>Date</Text>
                    <RNDateTimePicker value={selectedDate}
                                      display={'default'}
                                      mode={'date'}
                                      onChange={(event, date) => handleDateSelection(date)}/>
                </View>
                <View style={styles.formGroup}>
                    <Text>Time</Text>
                    <RNDateTimePicker value={selectedTime}
                                      display={'default'}
                                      mode={'time'}
                                      onChange={(event, date) => handleTimeSelection(date)}/>
                </View>
                <View style={styles.formGroup}>
                    <Text>Duration</Text>
                    <View style={styles.durationInputGroup}>
                        <TextInput style={styles.durationInput}
                                   keyboardType={'numeric'}
                                   onChangeText={(text) => handleDurationChange(text)}/>
                        <Text style={styles.measure}>hours</Text>
                    </View>
                </View>
            </View>
            {
                loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size='large'/>
                </View>
            }
        </Modal>
    );
}

const styles = StyleSheet.create({
    actionBar: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    mainForm: {
        marginTop: 25,
        paddingHorizontal: 10
    },
    formGroup: {
        marginBottom: 20
    },
    durationInputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    durationInput: {
        borderBottomWidth: 1,
        flex: 3
    },
    measure: {
        flex: 1,
        marginLeft: 10
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
        opacity: 0.5
    }
});

export default NewLessonModal;
