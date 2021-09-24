import StudentModel from './student-model';

export default interface LessonModel {
    lessonId?: number;
    lessonDate: string;
    student?: StudentModel;
    studentId: number;
    duration: number;
}
