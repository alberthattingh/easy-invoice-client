import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../components/home/Home";
import React from "react";
import Students from "../components/students/Students";


const Tabs = createBottomTabNavigator();

export default function PrimaryTabNavigator() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name={'Home'}
                         component={Home}
                         options={{title: 'Home'}} />
            <Tabs.Screen name={'Students'}
                         component={Students}
                         options={{title: 'My Students'}} />
        </Tabs.Navigator>
    );
}
