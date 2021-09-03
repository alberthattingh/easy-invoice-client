import StudentModel from './StudentModel';

export interface StudentListItemPropsModel {
    student: StudentModel;
    setShowSnackBar: (value: boolean) => void;
    setSnackMessage: (value: string) => void;
}
