import StudentModel from "./StudentModel";

export default interface LessonModel {
    lessonDate: string,
    student?: StudentModel,
    studentId: number,
    duration: number
}
