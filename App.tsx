import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import MainFlowNavigator from './navigators/MainStackNavigator';

export default function App() {
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: 'tomato',
            accent: 'yellow',
        },
    };

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <MainFlowNavigator />
            </NavigationContainer>
        </PaperProvider>
    );
}
