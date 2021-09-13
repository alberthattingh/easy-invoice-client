import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import StatusBarBackground from '../shared/StatusBarBackground';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import UserContext from '../provider/UserProvider';

function Account() {
    const { user, setUser } = useContext(UserContext);

    const [name, setName] = useState<string>(user?.firstName as string);
    const [surname, setSurname] = useState<string>(user?.lastName as string);
    const [email, setEmail] = useState<string>(user?.email as string);
    const [password, setPassword] = useState<string>('');

    const [accountHolder, setAccountHolder] = useState<string>(user?.bankingDetails?.accountHolder as string);
    const [accountType, setAccountType] = useState<string>(user?.bankingDetails?.accountType as string);
    const [accountNumber, setAccountNumber] = useState<string>(user?.bankingDetails?.accountNumber as string);
    const [bank, setBank] = useState<string>(user?.bankingDetails?.bank as string);
    const [branchCode, setBranchCode] = useState<string>(user?.bankingDetails?.branchCode as string);
    const [notice, setNotice] = useState<string>(user?.bankingDetails?.paymentInstruction as string);

    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');

    const save = () => {};

    return (
        <View style={styles.mainContainer}>
            <StatusBarBackground barStyle={'dark-content'} style={{ backgroundColor: 'transparent' }} />
            <View style={styles.topBar}></View>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>About me</Text>
                        <View style={styles.form}>
                            <TextInput
                                style={styles.formInput}
                                value={name}
                                label="Name"
                                left={<TextInput.Icon name="account-outline" />}
                                mode="outlined"
                                disabled={isLoading}
                                onChangeText={setName}
                            />
                            <TextInput
                                style={styles.formInput}
                                value={surname}
                                label="Surname"
                                left={<TextInput.Icon name="account-outline" />}
                                mode="outlined"
                                disabled={isLoading}
                                onChangeText={setSurname}
                            />
                            <TextInput
                                style={styles.formInput}
                                value={email}
                                label="Email"
                                left={<TextInput.Icon name="email-outline" />}
                                mode="outlined"
                                disabled={isLoading}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>
                  <View style={styles.section}>
                    <Text style={styles.heading}>Payment details</Text>
                    <View style={styles.form}>
                      <TextInput
                        style={styles.formInput}
                        value={accountHolder}
                        label="Account holder"
                        left={<TextInput.Icon name="account-outline" />}
                        mode="outlined"
                        disabled={isLoading}
                        onChangeText={setAccountHolder}
                      />
                      <TextInput
                        style={styles.formInput}
                        value={accountType}
                        label="Account type"
                        left={<TextInput.Icon name="credit-card" />}
                        mode="outlined"
                        disabled={isLoading}
                        onChangeText={setAccountType}
                      />
                      <TextInput
                        style={styles.formInput}
                        value={accountNumber}
                        label="Account number"
                        left={<TextInput.Icon name="numeric" />}
                        mode="outlined"
                        disabled={isLoading}
                        onChangeText={setAccountNumber}
                      />
                      <TextInput
                        style={styles.formInput}
                        value={bank}
                        label="Bank"
                        left={<TextInput.Icon name="bank" />}
                        mode="outlined"
                        disabled={isLoading}
                        onChangeText={setBank}
                      />
                      <TextInput
                        style={styles.formInput}
                        value={branchCode}
                        label="Branch code"
                        left={<TextInput.Icon name="office-building" />}
                        mode="outlined"
                        disabled={isLoading}
                        onChangeText={setBranchCode}
                      />
                      <TextInput
                        style={styles.formInput}
                        value={notice}
                        label="Notice"
                        left={<TextInput.Icon name="note" />}
                        mode="outlined"
                        disabled={isLoading}
                        onChangeText={setNotice}
                      />
                    </View>
                  </View>
                    <View style={styles.action}>
                        <Button
                            style={styles.saveButton}
                            mode="contained"
                            onPress={() => save()}
                            disabled={isLoading}
                            loading={isLoading}
                        >
                            Save
                        </Button>
                    </View>
                </ScrollView>
                <Snackbar
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                    action={{
                        label: 'OK',
                        onPress: () => setShowSnackBar(false),
                    }}
                >
                    {snackMessage}
                </Snackbar>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 5,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    button: {
        margin: 0,
    },
    content: {
        padding: 20,
        flex: 1,
    },
    heading: {
        fontSize: 32,
        marginBottom: 20,
    },
    form: {},
    formInput: {
        marginBottom: 5,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    saveButton: {
        borderRadius: 25,
        padding: 10,
        marginBottom: 50,
    },
    section: {
      marginBottom: 25,
    },
});

export default Account;
