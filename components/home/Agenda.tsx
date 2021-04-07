import {Text, View} from "react-native";
import React from "react";
import AgendaPropsModel from "../../models/AgendaPropsModel";

function Agenda(props: AgendaPropsModel) {
    return (
        <View>
            <Text>Agenda for {props.date}</Text>
        </View>
    );
}

export default Agenda;
