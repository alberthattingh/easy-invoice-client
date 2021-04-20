import React, {useContext, useEffect, useState} from "react";
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import StudentModel from "../../models/StudentModel";
import StudentList from "./StudentList";
import SimpleTextCard from "./SimpleTextCard";
import StatusBarBackground from "../status-bar-background/StatusBarBackground";
import NewStudentModal from "../popups/NewStudentModal";
import StudentContext from "../provider/StudentsProvider";

export default function Students() {
    const { myStudents, setMyStudents } = useContext(StudentContext);

    const [addStudentMode, setAddStudentMode] = useState<boolean>(false);

    const onAddNewStudent = (student: StudentModel) => {
        setMyStudents([...myStudents, student]);
    };


    return (
        <View style={styles.mainContainer}>
            <StatusBarBackground barStyle={'dark-content'} style={{backgroundColor: 'transparent'}} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => setAddStudentMode(true)}>
                    <View style={styles.buttonWrapper}>
                        <Image style={styles.image}
                               source={require('../../images/plus.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
            <Text></Text>
            {
                myStudents.length > 0
                    ?
                    <StudentList students={myStudents} />
                    :
                    <SimpleTextCard text={"You currently have no students"} />
            }
            <NewStudentModal visible={addStudentMode}
                             setVisible={setAddStudentMode}
                             newStudentCallback={onAddNewStudent} />
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
});
