import React, {useState} from 'react';
import {Text, View, StyleSheet, Button, Linking, ActivityIndicator} from 'react-native';
import LoginInput from "./LoginInput";
import LoginPropsModel from "../../models/LoginPropsModel";
import {AppScreens} from "../../models/AppScreensEnum";
import {login, setToken} from "../../services/LoginService";
import UserModel from "../../models/UserModel";
import {AxiosResponse} from "axios";
import SimpleModal from "../popups/SimpleModal";


function Login(props: LoginPropsModel) {
    const {navigation} = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onLoginAttempt = () => {
        setLoading(true);

        login(email, password).then((response: AxiosResponse<UserModel>) => {
            return response.data;
        }).then((user: UserModel) => {
            return setToken(user.token);
        }).then(() => {
            navigation.navigate(AppScreens.Home)
        }).catch((error) => {
            console.log(error.toString());
            setErrorModalVisible(true);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputsContainer}>
                    <LoginInput placeholder='Email'
                                changeHandler={setEmail}
                                icon={require('../../images/envelope.png')}/>
                    <LoginInput placeholder='Password'
                                changeHandler={setPassword}
                                icon={require('../../images/padlock.png')}/>

                    <Text style={[styles.link, styles.rightSide]}
                          onPress={() => Linking.openURL('https://google.com')}>
                        Forgot password?
                    </Text>
                </View>
                <View style={styles.actionsContainer}>
                    <View style={styles.submitWrapper}>
                        <Button title='LOGIN'
                                onPress={onLoginAttempt}/>
                    </View>
                    <View style={styles.signupWrapper}>
                        <Text style={styles.link}
                              onPress={() => Linking.openURL('https://google.com')}>
                            No account? Sign up here!
                        </Text>
                    </View>
                </View>
            </View>
            {
                loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size='large'/>
                </View>
            }
            {
                errorModalVisible &&
                <SimpleModal message='Login failed'
                             buttonText='OK'
                             modalVisible={errorModalVisible}
                             setModalVisible={setErrorModalVisible}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#22aaa1',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 50,
        margin: 50,
        borderRadius: 25
    },
    title: {
        textAlign: 'center',
        fontSize: 32
    },
    inputsContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    loginInput: {
        marginVertical: 25,
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'grey',
        height: 50,
        fontSize: 18
    },
    actionsContainer: {
        display: "flex",
        justifyContent: "center"
    },
    submitWrapper: {
        backgroundColor: '#22aaa1',
        borderRadius: 25,
        marginVertical: 15
    },
    signupWrapper: {},
    link: {
        color: 'blue'
    },
    rightSide: {
        textAlign: "right"
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

export default Login;
