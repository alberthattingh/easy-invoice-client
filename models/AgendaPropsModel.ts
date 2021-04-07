import LessonModel from "./LessonModel";

export default interface AgendaPropsModel {
    date: string,
    style: any
    lessons: LessonModel[]
}
