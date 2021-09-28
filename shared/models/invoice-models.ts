import LessonModel from './lesson-model';
import StudentModel from './student-model';
import UserModel from './user-model';

export interface InvoiceModel {
    invoiceId: number;
    invoiceNumber: number;
    description?: string;
    userId?: number;
    user?: UserModel;
    startDate: Date;
    endDate: Date;
    createdDate: Date;
    total: number;
    lessons?: LessonModel[];
}

export interface CreatedInvoice {
    invoiceId: number;
    invoiceNumber: number;
    invoiceUrl: string;
    startDate: Date;
    endDate: Date;
    createdDate: Date;
    total: number;
    description?: string;
}

export interface NewInvoiceDetailsModel {
    description: string;
    startDate: Date;
    endDate: Date;
    studentIds: number[];
}
