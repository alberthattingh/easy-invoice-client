import LessonModel from './LessonModel';

export default interface AgendaPropsModel {
    style: any;
    lessons: LessonModel[];
    setLessons: (lessons: LessonModel[]) => void;
}
