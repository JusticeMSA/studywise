import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import StackNavigator from './components/navigation/StackNavigator'
import DrawerNavigator from './components/navigation/DrawerNavigator'

export default function App() {
  return (
    
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}
