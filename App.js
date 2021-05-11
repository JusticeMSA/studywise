import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Context} from './context'

import StackNavigator from './components/navigation/StackNavigator'
import DrawerNavigator from './components/navigation/DrawerNavigator'


export default function App() {

  const [context, setContext] = useState();

  return (
   
    <Context.Provider value={[context, setContext]}>
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
    </Context.Provider>
  );
}
