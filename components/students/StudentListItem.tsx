import { ActivityIndicator, Avatar, Card, IconButton } from 'react-native-paper';
import React, { useState } from 'react';
import { StudentListItemPropsModel } from '../../models/StudentListItemPropsModel';

function StudentListItem(props: StudentListItemPropsModel) {
    const { student } = props;
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const deleteStudent = () => {
        if (!student.studentId) {
            return;
        }
        // TODO: Implement deletion
        setIsDeleting(true);
        setTimeout(() => setIsDeleting(false), 5000);
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
