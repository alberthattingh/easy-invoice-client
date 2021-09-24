import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StudentModel from '../../shared/models/student-model';
import StudentList from './student-list';
import SimpleTextCard from './simple-text-card';
import StatusBarBackground from '../../shared/components/status-bar-background';
import NewStudentModal from '../popups/new-student-modal';
import StudentContext from '../provider/students-provider';
import { IconButton } from 'react-native-paper';

export default function Students() {
    const { myStudents, setMyStudents } = useContext(StudentContext);

    const [addStudentMode, setAddStudentMode] = useState<boolean>(false);

    const onAddNewStudent = (student: StudentModel) => {
        setMyStudents([...myStudents, student]);
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBarBackground barStyle={'dark-content'} style={{ backgroundColor: 'transparent' }} />
            <View style={styles.topBar}>
                <IconButton icon="plus" size={40} style={styles.button} onPress={() => setAddStudentMode(true)} />
            </View>
            {myStudents.length > 0 ? (
                <StudentList students={myStudents} />
            ) : (
                <SimpleTextCard text={'You currently have no students'} />
            )}
            <NewStudentModal
                visible={addStudentMode}
                setVisible={setAddStudentMode}
                newStudentCallback={onAddNewStudent}
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
});
