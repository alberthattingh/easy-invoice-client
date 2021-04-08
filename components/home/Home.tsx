import {StyleSheet, View, Text, Image, TouchableOpacity, Modal} from "react-native";
import React, {useEffect, useState} from "react";
import {Calendar, CalendarList} from 'react-native-calendars';
import {getSimpleDate} from "../../services/DateService";
import Agenda from "./Agenda";
import LessonModel from "../../models/LessonModel";
import {getLessons} from "../../services/LessonService";
import NewLessonModal from "../popups/NewLessonModal";
import {getStudents} from "../../services/StudentService";
import StudentModel from "../../models/StudentModel";

function Home() {
    const [scheduledLessons, setScheduledLessons] = useState<LessonModel[]>([]);
    const [students, setStudents] = useState<StudentModel[]>([]);

    const [selectedDate, setSelectedDate] = useState<string>(getSimpleDate(new Date()));
    const [addLessonMode, setAddLessonMode] = useState<boolean>(false);

    const markedDates: Record<string, any> = {};

    useEffect(() => {
        getLessons()
            .then(response => response.data)
            .then(lessons => {
                console.log("Updating lessons in state...");
                setScheduledLessons(lessons);
            })
            .then(() => {
                return getStudents()
            })
            .then((response) => response.data)
            .then(students => {
                console.log("Updating students in state..");
                setStudents(students);
            })
            .catch(error => {
                console.log(error.toString());
            });
    }, []);

    scheduledLessons.forEach((value => {
        markedDates[getSimpleDate(new Date(value.lessonDate))] = {marked: true}
    }));
    markedDates[selectedDate] = {marked: false, selected: true, selectedColor: 'blue'};

    const lessonsForSelectedDate = scheduledLessons.filter((lesson) => {
        return getSimpleDate(new Date(lesson.lessonDate)) === selectedDate;
    });

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => setAddLessonMode(true)}>
                    <View style={styles.buttonWrapper}>
                        <Image style={styles.image}
                               source={require('../../images/plus.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
            <Calendar style={styles.calendar}
                      onDayPress={(day) => setSelectedDate(day.dateString)}
                      markedDates={markedDates}/>
            <Agenda style={styles.agenda}
                    date={selectedDate}
                    lessons={lessonsForSelectedDate}
            />
            <NewLessonModal visible={addLessonMode}
                            setVisible={setAddLessonMode}
                            students={students}/>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 5
    },
    topBar: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonWrapper: {
        marginEnd: 10,
        width: 30,
        height: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    calendar: {
        marginBottom: 5
    },
    agenda: {}
});

export default Home;
