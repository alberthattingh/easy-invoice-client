import LessonModel from './LessonModel';

export default interface AgendaItemPropsModel {
    time: string;
    lesson: LessonModel;
    setLessons: (lessons: LessonModel[]) => void;
    setSnackMessage: (message: string) => void;
    setShowSnackBar: (value: boolean) => void;
}
