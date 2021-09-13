import StudentModel from '../StudentModel';

export default interface StudentsContextModel {
    myStudents: StudentModel[];
    setMyStudents: (students: StudentModel[]) => void;
}
