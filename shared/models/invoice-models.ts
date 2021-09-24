import LessonModel from './lesson-model';
import StudentModel from './student-model';
import UserModel from './user-model';

export interface InvoiceModel {
    invoiceId: number;
    invoiceNumber: number;
    description: string;
    userId: number;
    user: UserModel;
    startDate: Date;
    endDate: Date;
    createdDate: Date;
    total: number;
    lessons: LessonModel[];
}

export interface InvoicesListPropsModel {
    invoices: InvoiceModel[];
}

export interface NewInvoiceDetailsModel {
    description: string;
    startDate: Date;
    endDate: Date;
    studentIds: number[];
}

export interface CreateInvoiceModalPropsModel {
    visible: boolean;
    setVisible: (value: boolean) => void;
    myStudents: StudentModel[];
    newInvoiceCallback: (invoice: InvoiceModel) => void;
}
