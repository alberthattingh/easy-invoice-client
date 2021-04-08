import StudentModel from "./StudentModel";

export default interface NewLessonModalPropsModel {
    visible: boolean,
    setVisible: (value: boolean) => void,
    students: StudentModel[]
}
