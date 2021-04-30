import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importing Components
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';

//Create stack
const Stack = createStackNavigator();


export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{tittle: 'Welcome'}}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{tittle: 'Login'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});