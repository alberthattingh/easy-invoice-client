import {createStackNavigator} from "@react-navigation/stack";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import React from "react";

export enum AppScreens {
    Login = 'Login',
    Home = 'Home'
}

export type MainStackParamList = {
    Login: undefined,
    Home: undefined
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainFlowNavigator = () => {
    return (
        <MainStack.Navigator headerMode='none'>
            <MainStack.Screen name={AppScreens.Login} component={Login} />
            <MainStack.Screen name={AppScreens.Home} component={Home} />
        </MainStack.Navigator>
    )
};

export default MainFlowNavigator;
