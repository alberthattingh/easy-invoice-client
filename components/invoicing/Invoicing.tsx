import React, {useContext} from "react";
import StudentContext from "../provider/StudentsProvider";
import {View} from "react-native";

export default function Invoicing() {
    const { myStudents, setMyStudents } = useContext(StudentContext);

    return (
        <View>

        </View>
    );
}
