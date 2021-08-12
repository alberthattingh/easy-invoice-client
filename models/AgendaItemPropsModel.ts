import StudentModel from './StudentModel';

export default interface AgendaItemPropsModel {
    time: string;
    student?: StudentModel;
}
