import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login/login';
import React from 'react';
import { AppScreens } from '../shared/constants/app-screens.enum';
import PrimaryTabNavigator from './tab.navigator';
import SignUp from '../components/signup/sign-up';
import { UserProvider } from '../components/provider/user-provider';

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
