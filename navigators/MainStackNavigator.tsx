import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login/Login';
import React from 'react';
import { AppScreens } from '../models/AppScreensEnum';
import PrimaryTabNavigator from './PrimaryTabNavigator';
import SignUp from '../components/signup/SignUp';
import { UserProvider } from '../components/provider/UserProvider';

export type MainStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainFlowNavigator = () => {
    return (
        <UserProvider>
            <MainStack.Navigator headerMode="none">
                <MainStack.Screen name={AppScreens.Login} component={Login} />
                <MainStack.Screen name={AppScreens.SignUp} component={SignUp} />
                <MainStack.Screen name={AppScreens.Home} component={PrimaryTabNavigator} />
            </MainStack.Navigator>
        </UserProvider>
    );
};

export default MainFlowNavigator;
