import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login/Login';
import React from 'react';
import { AppScreens } from '../models/AppScreensEnum';
import PrimaryTabNavigator from './PrimaryTabNavigator';

export type MainStackParamList = {
	Login: undefined;
	Home: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainFlowNavigator = () => {
	return (
		<MainStack.Navigator headerMode="none">
			<MainStack.Screen name={AppScreens.Login} component={Login} />
			<MainStack.Screen name={AppScreens.Home} component={PrimaryTabNavigator} />
		</MainStack.Navigator>
	);
};

export default MainFlowNavigator;
