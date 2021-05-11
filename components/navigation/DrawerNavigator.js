import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'


//Import Screens
import DashHome from '../DashboardScreen'
import AddAppointment from '../AddAppointment'
import NotificationsScreen from '../NotificationsScreen'
import ViewAppoinmtments from '../ViewAppoinmtments'
import ProfileScreen from '../ProfileScreen'
import ChangePassword from '../ChangePassword'

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashHome} />
        <Drawer.Screen name="Add New Appointment" component={AddAppointment} />
        <Drawer.Screen name="Notifications [1]" component={NotificationsScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="View Appointments" component={ViewAppoinmtments} />
        <Drawer.Screen name="Update Appointments" component={DashHome} />
        <Drawer.Screen name="Logout" component={DashHome} />
        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
        </Drawer.Navigator>
    )
}
