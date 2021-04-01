import {View} from "react-native";
import React, {useState} from "react";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {formatDate} from "../../services/DateService";

const Home = () => {
    const lessons = [{
        date: '2021-03-05',
        student: 'James McDonald'
    }, {
        date: '2021-03-17',
        student: 'Megan McNair'
    }];

    const [scheduledLessons, setScheduledLessons] = useState(lessons);
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

    const markedDates: Record<string, any> = { };
    scheduledLessons.forEach((value => {
        markedDates[value.date.toString()] = {marked: true}
    }));
    markedDates[selectedDate] = {marked: false, selected: true, selectedColor: 'blue'};

    return (
        <View>
            <Calendar markedDates={markedDates} />
        </View>
    );
}

export default Home;
