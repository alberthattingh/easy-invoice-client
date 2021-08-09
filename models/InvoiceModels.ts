import LessonModel from './LessonModel';
import StudentModel from './StudentModel';

export interface InvoiceModel {
	invoiceId: number;
	userId: number;
	startDate: Date;
	endDate: Date;
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
}
