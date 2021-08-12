import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AgendaItemPropsModel from '../../models/AgendaItemPropsModel';

function AgendaItem(props: AgendaItemPropsModel) {
    const { time, student } = props;

    return (
        <View>
            {student === undefined ? (
                <View style={styles.container}>
                    <Text>Error</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.time}>
                        <Text>{time}</Text>
                    </View>
                    <View style={styles.description}>
                        <Text>{`${student.firstName} ${student.lastName}`}</Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,

        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        minHeight: 50,
    },
    time: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    description: {
        flex: 3,
        margin: 5,
        justifyContent: 'center',
    },
});

export default AgendaItem;
