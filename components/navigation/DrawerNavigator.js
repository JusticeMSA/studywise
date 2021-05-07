import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'


//Import Screens
import DashHome from '../DashboardScreen'

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashHome} />
        <Drawer.Screen name="Add New Appointment" component={DashHome} />
        <Drawer.Screen name="Notifications" component={DashHome} />
        <Drawer.Screen name="View Appointments" component={DashHome} />
        <Drawer.Screen name="Update Appointments" component={DashHome} />
        <Drawer.Screen name="Profile" component={DashHome} />
        <Drawer.Screen name="Logout" component={DashHome} />
        </Drawer.Navigator>
    )
}
