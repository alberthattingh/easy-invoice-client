import React, { useState } from 'react';
import { Text, View, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import LoginPropsModel from '../../models/LoginPropsModel';
import { AppScreens } from '../../models/AppScreensEnum';
import { login, setToken } from '../../services/LoginService';
import UserModel from '../../models/UserModel';
import { AxiosResponse } from 'axios';
import SimpleModal from '../popups/SimpleModal';
import StatusBarBackground from '../shared/StatusBarBackground';
import { Button, TextInput } from 'react-native-paper';

function Login(props: LoginPropsModel) {
    const { navigation } = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
    const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onLoginAttempt = () => {
        setLoading(true);

        login(email, password)
            .then((response: AxiosResponse<UserModel>) => {
                return response.data;
            })
            .then((user: UserModel) => {
                return setToken(user.token as string);
            })
            .then(() => {
                navigation.navigate(AppScreens.Home);
            })
            .catch((error) => {
                console.log(error.toString());
                setErrorModalVisible(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBarBackground barStyle={'dark-content'} style={{ backgroundColor: 'transparent' }} />
            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>
                <View>
                    <TextInput
                        style={styles.formInput}
                        label="Email"
                        left={<TextInput.Icon name="email-outline" />}
                        mode="outlined"
                        disabled={loading}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.formInput}
                        label="Password"
                        secureTextEntry={passwordHidden}
                        left={<TextInput.Icon name="lock-outline" />}
                        right={<TextInput.Icon name="eye" onPress={() => setPasswordHidden(!passwordHidden)} />}
                        mode="outlined"
                        disabled={loading}
                        onChangeText={setPassword}
                    />

                    <Text style={[styles.link, styles.rightSide]} onPress={() => Linking.openURL('https://google.com')}>
                        Forgot password?
                    </Text>
                </View>
                <View style={styles.action}>
                    <Button
                        style={styles.logInButton}
                        mode="contained"
                        onPress={() => onLoginAttempt()}
                        disabled={loading}
                        loading={loading}
                    >
                        Login
                    </Button>
                </View>
            </View>
            <View style={styles.signUpWrapper}>
                <Text style={styles.link} onPress={() => navigation.navigate(AppScreens.SignUp)}>
                    Don't have an account? Sign up
                </Text>
            </View>
            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
            )}
            {errorModalVisible && (
                <SimpleModal
                    message="Login failed"
                    buttonText="OK"
                    modalVisible={errorModalVisible}
                    setModalVisible={setErrorModalVisible}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 5,
    },
    content: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
    },
    formInput: {
        marginBottom: 5,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    signUpWrapper: {
        marginTop: 'auto',
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
    },
    logInButton: {
        borderRadius: 25,
        padding: 10,
        marginBottom: 50,
    },
    link: {
        color: 'blue',
    },
    rightSide: {
        textAlign: 'right',
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
        opacity: 0.5,
    },
});

export default Login;
