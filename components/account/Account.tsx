import { KeyboardAvoidingView, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import StatusBarBackground from '../../shared/components/status-bar-background';
import ImageSelector from '../../shared/components/image-selector';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import UserContext from '../provider/user-provider';
import UserModel from '../../shared/models/user-model';
import { getUserLogo, updateUserDetails, updateUserLogo } from '../../services/account.service';
import { LibraryPermissionStatus } from '../../shared/constants/library-permission-status.enum';
import { LogoData } from '../../shared/models/logo-data';
import * as FileSystem from 'expo-file-system';

function Account(): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const activeBankAccount = user?.bankingDetails?.find((acc) => acc.isActive);

    const [name, setName] = useState<string>(user?.firstName as string);
    const [surname, setSurname] = useState<string>(user?.lastName as string);
    const [email, setEmail] = useState<string>(user?.email as string);
    // const [password, setPassword] = useState<string>('');

    const [accountHolder, setAccountHolder] = useState<string>(activeBankAccount?.accountHolder as string);
    const [accountType, setAccountType] = useState<string>(activeBankAccount?.accountType as string);
    const [accountNumber, setAccountNumber] = useState<string>(activeBankAccount?.accountNumber as string);
    const [bank, setBank] = useState<string>(activeBankAccount?.bank as string);
    const [branchCode, setBranchCode] = useState<string>(activeBankAccount?.branchCode as string);
    const [notice, setNotice] = useState<string>(activeBankAccount?.paymentInstruction as string);

    const [logo, setLogo] = useState<string>('');
    const [permissionStatus, setPermissionStatus] = useState<LibraryPermissionStatus>(
        LibraryPermissionStatus.NotSpecified,
    );
    const [showPermissionSnack, setShowPermissionSnack] = useState<boolean>(false);

    // const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');

    const bankingDetailsUnchanged = () => false;

    const openPermissionSettings = async () => {
        setShowPermissionSnack(false);
        setPermissionStatus(LibraryPermissionStatus.NotSpecified);
        await Linking.openURL('app-settings:');
    };

    useEffect(() => {
        displayCurrentLogo()
            .then((uri) => {
                if (uri && !logo) {
                    setLogo(uri);
                }
            })
            .catch(() => {
                setSnackMessage('Could not retrieve your logo. An error occurred.');
                setShowSnackBar(true);
            });
    }, []);

    const displayCurrentLogo = async () => {
        if (user?.logoUrl && user.logoName) {
            let logoUri: string;
            const fileInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}/${user.logoName}`);

            if (fileInfo.exists) {
                logoUri = fileInfo.uri;
            } else {
                logoUri = (await getUserLogo(user.logoUrl, user.logoName)).uri;
            }

            return logoUri;
        }
        return null;
    };

    const updateLogo = (imageRef: string) => {
        setLogo(imageRef);

        const filename = imageRef.split('/').pop();
        const match = /\.(\w+)$/.exec(filename as string); // Infer the type of the image
        const type = match ? `image/${match[1]}` : `image`;

        const logoFile: LogoData = {
            uri: imageRef,
            type,
            name: filename as string,
        };

        updateUserLogo(logoFile)
            .then((response) => response.data)
            .then((updatedUser) => {
                setUser(updatedUser);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setSnackMessage('Could not update your logo. An error occurred.');
                setShowSnackBar(true);
            });
    };

    const save = () => {
        if (!name) {
            setSnackMessage('First name is required');
            setShowSnackBar(true);
            return;
        }

        if (!surname) {
            setSnackMessage('Surname is required');
            setShowSnackBar(true);
            return;
        }

        if (!email) {
            setSnackMessage('Email address is required');
            setShowSnackBar(true);
            return;
        }

        setIsLoading(true);
        const updatedDetails: UserModel = {
            firstName: name,
            lastName: surname,
            email,
            defaultFee: user?.defaultFee,
            cell: user?.cell,
        };

        if (!bankingDetailsUnchanged())
            updatedDetails.accountDetails = [
                {
                    accountNumber,
                    accountHolder,
                    accountType,
                    bank,
                    branchCode,
                    paymentInstruction: notice,
                    isActive: true,
                },
            ];

        updateUserDetails(updatedDetails)
            .then((response) => response.data)
            .then((updatedUser) => {
                setIsLoading(false);
                updatedUser.token = user?.token;
                setUser(updatedUser);
            })
            .catch(() => {
                setIsLoading(false);
                setSnackMessage('Could not update user details. An error occurred.');
                setShowSnackBar(true);
            });
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBarBackground barStyle={'dark-content'} style={{ backgroundColor: 'transparent' }} />
            <View style={styles.topBar} />
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
                    <View style={styles.section}>
                        <Text style={styles.heading}>Custom logo</Text>
                        <ImageSelector
                            imageUri={logo}
                            setShowPermissionSnack={setShowPermissionSnack}
                            setShowSnackBar={setShowSnackBar}
                            setSnackMessage={setSnackMessage}
                            showPermissionSnack={showPermissionSnack}
                            showSnackBar={showSnackBar}
                            snackMessage={snackMessage}
                            onPressCallback={(imageRef) => {
                                updateLogo(imageRef);
                            }}
                        />
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
                <Snackbar
                    visible={showPermissionSnack}
                    onDismiss={() => setShowPermissionSnack(false)}
                    action={{
                        label: 'OPEN SETTINGS',
                        onPress: () => openPermissionSettings(),
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
        marginTop: 10,
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
