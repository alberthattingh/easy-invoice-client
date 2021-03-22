import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

function Login() {
    return(
        <View style={styles.loginContainer}>
            <TextInput placeholder="Email" style={styles.loginInput} />
            <TextInput placeholder="Password" style={styles.loginInput} />
        </View>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'center'
    },
    loginInput: {
        marginBottom: 50,
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'grey',
        height: 50,
        fontSize: 18
    }
});

export default Login;