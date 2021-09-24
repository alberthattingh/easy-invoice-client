import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { getSimpleDate } from '../../services/DateService';
import Agenda from './Agenda';
import LessonModel from '../../models/LessonModel';
import { getLessons } from '../../services/LessonService';
import NewLessonModal from '../popups/NewLessonModal';
import StatusBarBackground from '../shared/components/StatusBarBackground';
import StudentContext from '../provider/StudentsProvider';
import { IconButton, useTheme } from 'react-native-paper';

function Home() {
    const { colors } = useTheme();
    const { myStudents, setMyStudents } = useContext(StudentContext);

    const [scheduledLessons, setScheduledLessons] = useState<LessonModel[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(getSimpleDate(new Date()));
    const [addLessonMode, setAddLessonMode] = useState<boolean>(false);

    const markedDates: Record<string, any> = {};

    useEffect(() => {
        getLessons()
            .then((response) => response.data)
            .then((lessons) => {
                setScheduledLessons(lessons);
            })
            .catch((error) => {
                console.log(error.toString());
            });
    }, []);

    scheduledLessons.forEach((value) => {
        markedDates[getSimpleDate(new Date(value.lessonDate))] = {
            marked: true,
            dotColor: colors.accent,
        };
    });
    markedDates[selectedDate] = {
        marked: false,
        selected: true,
        selectedColor: colors.primary,
    };

    const lessonsForSelectedDate = scheduledLessons.filter((lesson) => {
        return getSimpleDate(new Date(lesson.lessonDate)) === selectedDate;
    });

    const onAddNewLesson = (lesson: LessonModel) => {
        setScheduledLessons([...scheduledLessons, lesson]);
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBarBackground barStyle={'dark-content'} style={{ backgroundColor: 'transparent' }} />
            <View style={styles.topBar}>
                <IconButton icon="plus" size={40} style={styles.button} onPress={() => setAddLessonMode(true)} />
            </View>
            <View style={styles.content}>
                <Calendar
                    style={styles.calendar}
                    theme={{ arrowColor: colors.primary }}
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={markedDates}
                />
                <Agenda style={styles.agenda} lessons={lessonsForSelectedDate} setLessons={setScheduledLessons} />
            </View>
            <NewLessonModal
                visible={addLessonMode}
                initialDate={new Date(selectedDate)}
                setVisible={setAddLessonMode}
                newLessonCallback={onAddNewLesson}
                students={myStudents}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 5,
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        marginVertical: 0,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
    },
    calendar: {
        marginBottom: 5,
    },
    agenda: {
        paddingBottom: 10,
        flex: 1,
    },
});

export default Home;
