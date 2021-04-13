import {ActivityIndicator, Button, Modal, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import NewStudentModalPropsModel from "../../models/NewStudentModalPropsModel";

export default function NewStudentModal(props: NewStudentModalPropsModel) {
    const {visible, setVisible, newStudentCallback} = props;
    const [loading, setLoading] = useState<boolean>(false);

    const onCancel = () => {
        setVisible(false);
    };

    const onSave = () => {
        setVisible(false);
    };

    return (
        <Modal style={styles.modal} animationType={'slide'} presentationStyle={"formSheet"} visible={visible}>
            <View style={styles.actionBar}>
                <Button title={'Cancel'} onPress={onCancel}/>
                <Button title={'Save'} onPress={onSave}/>
            </View>
            <View style={styles.mainForm}>

            </View>
            {
                loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size='large'/>
                </View>
            }
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {},
    actionBar: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    mainForm: {
        marginTop: 25,
        paddingHorizontal: 10,
        justifyContent: "space-evenly"
    },
    formGroup: {
        marginBottom: 20,
    },
    loader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        opacity: 0.5
    }
});
