import StudentListPropsModel from '../../models/StudentListPropsModel';
import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import SimpleTextCard from './SimpleTextCard';

export default function StudentList(props: StudentListPropsModel) {
    const { students } = props;

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.list}>
                {students.map((value, index) => {
                    return (
                        <SimpleTextCard
                            key={value.studentId}
                            text={value.firstName + ' ' + value.lastName}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
    },
    list: {
        padding: 10,
    },
});
