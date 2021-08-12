import { RouteProp } from '@react-navigation/native';
import StudentModel from './StudentModel';

export default interface StudentsContextModel {
    myStudents: StudentModel[];
    setMyStudents: (students: StudentModel[]) => void;
}
