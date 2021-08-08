import LessonModel from "./LessonModel";

export interface InvoiceModel {
    invoiceId: number,
    userId: number,
    startDate: Date,
    endDate: Date,
    total: number,
    lessons: LessonModel[],
}