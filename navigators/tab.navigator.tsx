import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/home/home';
import React from 'react';
import Students from '../components/students/students';
import { StudentsProvider } from '../components/provider/students-provider';
import Invoicing from '../components/invoicing/invoicing';
import Account from '../components/account/account';

const Tabs = createBottomTabNavigator();

export default function PrimaryTabNavigator() {
    return (
        <StudentsProvider>
            <Tabs.Navigator
                tabBarOptions={{
                    tabStyle: {
                        justifyContent: 'center',
                    },
                    iconStyle: false,
                }}
            >
                <Tabs.Screen name={'Home'} component={Home} options={{ title: 'Home' }} />
                <Tabs.Screen name={'Students'} component={Students} options={{ title: 'Students' }} />
                <Tabs.Screen name={'Invoicing'} component={Invoicing} options={{ title: 'Invoice' }} />
                <Tabs.Screen name={'Account'} component={Account} options={{ title: 'Account' }} />
            </Tabs.Navigator>
        </StudentsProvider>
    );
}
