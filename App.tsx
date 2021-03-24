import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import MainFlowNavigator from "./navigators/MainStackNavigator";


export default function App() {
  return (
      <NavigationContainer>
        <MainFlowNavigator />
      </NavigationContainer>
  );
}
