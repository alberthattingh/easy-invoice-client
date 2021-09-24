import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import MainFlowNavigator from './navigators/main-stack.navigator';

export default function App() {
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#2a9d8f',
            accent: '#e9c46a',
            onSurface: '#264653',
            surface: '#FFF',
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
