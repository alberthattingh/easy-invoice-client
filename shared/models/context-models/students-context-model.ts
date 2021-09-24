import StudentModel from '../student-model';

export default interface StudentsContextModel {
    myStudents: StudentModel[];
    setMyStudents: (students: StudentModel[]) => void;
}
