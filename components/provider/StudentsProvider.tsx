import React, {createContext, useEffect, useState} from "react";
import StudentModel from "../../models/StudentModel";
import {getStudents} from "../../services/StudentService";
import StudentsContextModel from "../../models/StudentsContextModel";

const StudentContext = createContext<StudentsContextModel>({
    myStudents: [],
    setMyStudents: () => {}
});

export function StudentsProvider(props: {children: any}) {
    const [myStudents, setMyStudents] = useState<StudentModel[]>([]);

    useEffect(() => {
        getStudents()
            .then((response) => response.data)
            .then((students) => {
                console.log("Updating students in state..");
                setMyStudents(students);
            })
            .catch(error => {
                console.log(error.toString());
            });
    }, []);

    return (
        <StudentContext.Provider value={{
            myStudents,
            setMyStudents
        }}>
            {props.children}
        </StudentContext.Provider>
    );
}

export default StudentContext;
