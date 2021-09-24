import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useState } from 'react';
import StatusBarBackground from '../../shared/components/status-bar-background';
import { IconButton, Button, TextInput, Snackbar } from 'react-native-paper';
import { AppScreens } from '../../shared/constants/app-screens.enum';
import { signUp } from '../../services/account.service';
import { login, setToken } from '../../services/login.service';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigators/main-stack.navigator';

type SignUpScreenNavProps = StackNavigationProp<MainStackParamList, AppScreens.SignUp>;

interface Props {
    navigation: SignUpScreenNavProps;
}

function SignUp(props: Props) {
    const { navigation } = props;
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitSignUp = () => {
        Keyboard.dismiss();

        if (!(name && surname && email && password)) {
            setSnackMessage('Please complete all fields');
            setShowSnackBar(true);
            return;
        }
        setIsLoading(true);

        signUp({
            firstName: name,
            lastName: surname,
            email,
            userPassword: password,
        })
            .then((response) => response.data)
            .then(() => login(email, password))
            .then((response) => response.data)
            .then((user) => setToken(user.token as string))
            .then(() => navigation.navigate(AppScreens.Home))
            .catch((error) => {
                setSnackMessage('An error occurred. Could not create account.');
                setShowSnackBar(true);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBarBackground barStyle={'dark-content'} style={{ backgroundColor: 'transparent' }} />
            <View style={styles.topBar}>
                <IconButton
                    icon="arrow-left"
                    size={40}
                    style={styles.button}
                    onPress={() => navigation.navigate(AppScreens.Login)}
                />
            </View>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView style={styles.content}>
                    <Text style={styles.heading}>Create account</Text>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.formInput}
                            label="Name"
                            left={<TextInput.Icon name="account-outline" />}
                            mode="outlined"
                            disabled={isLoading}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.formInput}
                            label="Surname"
                            left={<TextInput.Icon name="account-outline" />}
                            mode="outlined"
                            disabled={isLoading}
                            onChangeText={setSurname}
                        />
                        <TextInput
                            style={styles.formInput}
                            label="Email"
                            left={<TextInput.Icon name="email-outline" />}
                            mode="outlined"
                            disabled={isLoading}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.formInput}
                            label="Password"
                            secureTextEntry={passwordHidden}
                            left={<TextInput.Icon name="lock-outline" />}
                            right={<TextInput.Icon name="eye" onPress={() => setPasswordHidden(!passwordHidden)} />}
                            mode="outlined"
                            disabled={isLoading}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={styles.action}>
                        <Button
                            style={styles.signUpButton}
                            mode="contained"
                            onPress={() => submitSignUp()}
                            disabled={isLoading}
                            loading={isLoading}
                        >
                            Sign Up
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
    signUpButton: {
        borderRadius: 25,
        padding: 10,
        marginBottom: 50,
    },
});

export default SignUp;
