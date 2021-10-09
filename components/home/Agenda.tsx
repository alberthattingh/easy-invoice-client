/* eslint-disable react/no-unescaped-entities */
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AgendaItem from './agenda-item';
import { getSimpleTime } from '../../services/date.service';
import { Snackbar } from 'react-native-paper';
import LessonModel from '../../shared/models/lesson-model';

interface Props {
    style: any;
    lessons: LessonModel[];
    setLessons: (lessons: LessonModel[]) => void;
}

function Agenda(props: Props) {
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');

    return (
        <View style={[styles.container, props.style]}>
            <ScrollView style={styles.list}>
                {props.lessons.length > 0 ? (
                    props.lessons.map((value, index) => {
                        const date = new Date(value.lessonDate);
                        const time = getSimpleTime(date);
                        return (
                            <AgendaItem
                                time={time}
                                lesson={value}
                                key={index}
                                setLessons={props.setLessons}
                                setShowSnackBar={setShowSnackBar}
                                setSnackMessage={setSnackMessage}
                            />
                        );
                    })
                ) : (
                    <View style={styles.emptyAgenda}>
                        <Text>Put your feet up! There's nothing on your schedule.</Text>
                    </View>
                )}
            </ScrollView>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
    list: {
        padding: 10,
        height: '100%',
    },
    heading: {
        marginBottom: 10,
        fontSize: 23,
    },
    emptyAgenda: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,

        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Agenda;
