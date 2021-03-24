import React from 'react';
import {Text, TextInput, View, StyleSheet, Image} from 'react-native';
import {LoginInputPropsModel} from "../../models/LoginInputPropsModel";

function LoginInput(props: LoginInputPropsModel) {
    return(
        <View style={styles.loginContainer}>
            <View style={styles.imageWrapper}>
                <Image source={props.icon}
                       style={styles.image} />
            </View>
            <TextInput placeholder={props.placeholder}
                       secureTextEntry={props.placeholder === 'Password'}
                       style={styles.loginInput} />
        </View>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        borderBottomWidth: 1
    },
    loginInput: {
        width: '80%',
        height: 50,
        fontSize: 18,
        padding: 5
    },
    imageWrapper: {
        width: 30,
        height: 30,
        padding: 5
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default LoginInput;
