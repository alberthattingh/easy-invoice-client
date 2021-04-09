import {Text, View, StyleSheet, ScrollView} from "react-native";
import React from "react";
import AgendaPropsModel from "../../models/AgendaPropsModel";
import AgendaItem from "./AgendaItem";
import {getSimpleTime} from "../../services/DateService";

function Agenda(props: AgendaPropsModel) {
    return (
        <View style={[styles.container, props.style]}>

            <ScrollView>
                {
                    props.lessons.length > 0
                        ?
                        props.lessons.map(
                            (value, index) => {
                                const date = new Date(value.lessonDate);
                                const time = getSimpleTime(date);
                                return <AgendaItem time={time} student={value.student} key={index}/>
                            }
                        )
                        :
                        <View style={styles.emptyAgenda}>
                            <Text>Put your feet up! There's nothing on your schedule.</Text>
                        </View>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
    },
    heading: {
        marginBottom: 10,
        fontSize: 23
    },
    emptyAgenda: {
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
        marginBottom: 5,
        minHeight: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Agenda;
