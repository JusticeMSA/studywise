import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

//Importing Screens
import HomeScreen from '../HomeScreen';
import LoginScreen from '../LoginScreen';
import DashboardScreen from '../DashboardScreen';
import DrawerNavigator from '../navigation/DrawerNavigator'
import RegisterScreen from '../RegisterScreen';


//Create stack
const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
            headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={DrawerNavigator} />
        </Stack.Navigator>
    )
}
