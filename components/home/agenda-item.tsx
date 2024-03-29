import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ActivityIndicator, Avatar, Card, IconButton } from 'react-native-paper';
import LessonModel from '../../shared/models/lesson-model';
import { deleteLesson, getLessons } from '../../services/lesson.service';

interface Props {
    time: string;
    lesson: LessonModel;
    setLessons: (lessons: LessonModel[]) => void;
    setSnackMessage: (message: string) => void;
    setShowSnackBar: (value: boolean) => void;
}

function AgendaItem(props: Props) {
    const { time, lesson, setLessons, setSnackMessage, setShowSnackBar } = props;

    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const cancelLesson = () => {
        setIsDeleting(true);
        deleteLesson(lesson.lessonId as number)
            .then((response) => {
                if (response.status === 200) {
                    return getLessons();
                }
                throw new Error('Error deleting lesson');
            })
            .then((response) => response.data)
            .then((lessons) => {
                setIsDeleting(false);
                return lessons;
            })
            .then((lessons) => setLessons(lessons))
            .catch((error) => {
                setSnackMessage('An error occurred. Could not delete.');
                setShowSnackBar(true);
            });
    };

    return (
        <View>
            {!lesson ? (
                <View style={styles.container}>
                    <Text>Error</Text>
                </View>
            ) : (
                <Card.Title
                    title={`${lesson.student?.firstName} ${lesson.student?.lastName}`}
                    subtitle={time}
                    left={(props) => <Avatar.Icon {...props} icon="notebook" />}
                    right={(props) =>
                        isDeleting ? (
                            <ActivityIndicator animating={true} />
                        ) : (
                            <IconButton {...props} icon="trash-can-outline" onPress={() => cancelLesson()} />
                        )
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        marginBottom: 10,
        minHeight: 50,
    },
    time: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    description: {
        flex: 3,
        margin: 5,
        justifyContent: 'center',
    },
});

export default AgendaItem;
