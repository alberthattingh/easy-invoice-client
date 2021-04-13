import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import StatusBarPropsModel from "../../models/StatusBarPropsModel";

function StatusBarBackground(props: StatusBarPropsModel) {
    return (
        <View style={[styles.statusBarBackground, props.style || {}]}>
            <StatusBar barStyle={props.barStyle || 'default'} />
        </View>
    );
} // This part is just so you can change the color of the status bar from the parents by passing it as a prop

const styles = StyleSheet.create({
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 20 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
        backgroundColor: "white",
    }

})

export default StatusBarBackground;
