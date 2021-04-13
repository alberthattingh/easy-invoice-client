import StudentModel from "./StudentModel";

export default interface NewStudentModalPropsModel {
    visible: boolean,
    setVisible: (value: boolean) => void,
    newStudentCallback: (student: StudentModel) => void
}
