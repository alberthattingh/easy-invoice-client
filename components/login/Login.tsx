import React from 'react';
import {Text, TextInput, View, StyleSheet, Button, Linking} from 'react-native';
import LoginInput from "./LoginInput";

function Login() {
    return(
        <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputsContainer}>
                <LoginInput placeholder='Email' icon={require('../../images/envelope.png')}/>
                <LoginInput placeholder='Password' icon={require('../../images/padlock.png')}/>
                <Text style={[styles.link, styles.rightSide]}
                      onPress={() => Linking.openURL('https://google.com')}>
                    Forgot password?
                </Text>
            </View>
            <View style={styles.actionsContainer}>
                <View style={styles.submitWrapper}>
                    <Button title='LOGIN'
                            onPress={() => console.log('test')} />
                </View>
                <View style={styles.signupWrapper}>
                    <Text style={styles.link}
                          onPress={() => Linking.openURL('https://google.com')} >
                        No account? Sign up here!
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    signupWrapper: {
    },
    link: {
        color: 'blue'
    },
    rightSide: {
        textAlign: "right"
    }
});

export default Login;
