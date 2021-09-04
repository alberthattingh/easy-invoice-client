import StudentModel from './StudentModel';
import LessonModel from './LessonModel';

export default interface NewLessonModalPropsModel {
    visible: boolean;
    setVisible: (value: boolean) => void;
    students: StudentModel[];
    initialDate: Date;
    newLessonCallback: (lesson: LessonModel) => void;
}
