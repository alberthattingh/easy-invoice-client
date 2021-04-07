import React from "react";
import {View, StyleSheet, Text} from 'react-native';
import AgendaItemPropsModel from "../../models/AgendaItemPropsModel";

function AgendaItem(props: AgendaItemPropsModel) {
    return (
        <View style={styles.container}>
            <View style={styles.time}><Text>{props.time}</Text></View>
            <View style={styles.description}><Text>{props.student}</Text></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,

        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        minHeight: 50
    },
    time: {
        flex: 1,
        margin: 5,
        justifyContent: "center",
        textAlign: "center"
    },
    description: {
        flex: 3,
        margin: 5,
        justifyContent: "center"
    }
});

export default AgendaItem;
