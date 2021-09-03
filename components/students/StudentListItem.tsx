import { ActivityIndicator, Avatar, Card, IconButton } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { StudentListItemPropsModel } from '../../models/StudentListItemPropsModel';
import { getStudents, removeStudent } from '../../services/StudentService';
import { getRecentInvoices } from '../../services/InvoiceService';
import StudentContext from '../provider/StudentsProvider';

function StudentListItem(props: StudentListItemPropsModel) {
    const { student, setShowSnackBar, setSnackMessage } = props;
    const { myStudents, setMyStudents } = useContext(StudentContext);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const deleteStudent = () => {
        if (!student.studentId) {
            return;
        }

        setIsDeleting(true);
        removeStudent(student.studentId)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Error deleting student');
                } else {
                    return getStudents();
                }
            })
            .then((response) => response.data)
            .then((students) => {
                setIsDeleting(false);
                setMyStudents(students);
            })
            .catch((error) => {
                setIsDeleting(false);
                setSnackMessage('Could not remove this student. An error occurred.');
                setShowSnackBar(true);
            });
    };

    return (
        <Card.Title
            left={(props) => <Avatar.Icon {...props} icon="account" />}
            title={`${student.firstName} ${student.lastName}`}
            subtitle={`Billed at ${student.feePayable.toLocaleString('en-ZA', {
                style: 'currency',
                currency: 'ZAR',
            })} per hour`}
            right={(props) =>
                isDeleting ? (
                    <ActivityIndicator animating={true} />
                ) : (
                    <IconButton {...props} icon="trash-can-outline" onPress={() => deleteStudent()} />
                )
            }
        />
    );
}

export default StudentListItem;
