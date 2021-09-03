import StudentListPropsModel from '../../models/StudentListPropsModel';
import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import StudentListItem from './StudentListItem';
import { Snackbar } from 'react-native-paper';

export default function StudentList(props: StudentListPropsModel) {
    const { students } = props;
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.list}>
                {students.map((student, index) => {
                    return (
                        <StudentListItem
                            student={student}
                            key={index}
                            setSnackMessage={setSnackMessage}
                            setShowSnackBar={setShowSnackBar}
                        />
                    );
                })}
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
    mainContainer: {
        height: '100%',
        flex: 1,
    },
    list: {
        padding: 10,
        flex: 1,
    },
});
