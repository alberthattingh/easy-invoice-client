import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/home/Home';
import React, { useEffect, useState } from 'react';
import Students from '../components/students/Students';
import { StudentsProvider } from '../components/provider/StudentsProvider';
import Invoicing from '../components/invoicing/Invoicing';

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
                <Tabs.Screen
                    name={'Students'}
                    component={Students}
                    options={{ title: 'Students' }}
                />
                <Tabs.Screen
                    name={'Invoicing'}
                    component={Invoicing}
                    options={{ title: 'Invoice' }}
                />
            </Tabs.Navigator>
        </StudentsProvider>
    );
}
