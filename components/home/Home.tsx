import {StyleSheet, View, Text} from "react-native";
import React, {useState} from "react";
import {Calendar, CalendarList} from 'react-native-calendars';
import {getSimpleDate} from "../../services/DateService";
import Agenda from "./Agenda";
import LessonModel from "../../models/LessonModel";

const Home = () => {
    const lessons: LessonModel[] = [{
        date: '2021-03-05',
        student: 'James McDonald'
    }, {
        date: '2021-03-17',
        student: 'Megan McNair'
    }];

    const [scheduledLessons, setScheduledLessons] = useState(lessons);
    const [selectedDate, setSelectedDate] = useState(getSimpleDate(new Date()));

    const markedDates: Record<string, any> = { };
    scheduledLessons.forEach((value => {
        markedDates[value.date.toString()] = {marked: true}
    }));
    markedDates[selectedDate] = {marked: false, selected: true, selectedColor: 'blue'};

    return (
        <View style={styles.mainContainer}>
            <Calendar style={styles.calendar} markedDates={markedDates} />
            <Agenda style={styles.agenda}
                    date={selectedDate}
                    lessons={scheduledLessons}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 5
    },
    calendar: {
        marginBottom: 5
    },
    agenda: {

    }
});

export default Home;
