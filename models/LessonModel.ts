import StudentModel from './StudentModel';

export default interface LessonModel {
    lessonId: number;
    lessonDate: string;
    student?: StudentModel;
    studentId: number;
    duration: number;
}
