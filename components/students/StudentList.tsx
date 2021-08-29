import StudentListPropsModel from '../../models/StudentListPropsModel';
import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Avatar, Card, IconButton } from 'react-native-paper';
import StudentListItem from './StudentListItem';

export default function StudentList(props: StudentListPropsModel) {
    const { students } = props;

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.list}>
                {students.map((student, index) => {
                    return <StudentListItem student={student} key={index} />;
                })}
            </ScrollView>
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
