import React, {useContext} from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {Context} from '../../context'


//Import Screens
import DashHome from '../DashboardScreen'
import AddAppointment from '../AddAppointment'
import NotificationsScreen from '../NotificationsScreen'
import ViewAppoinmtments from '../ViewAppoinmtments'
import ProfileScreen from '../ProfileScreen'
import ChangePassword from '../ChangePassword'
import UpdateScreen from '../UpdateScreen'
import Logout from '../Logout'
import AddStaffScreen from '../AddStaffScreen'

const Drawer = createDrawerNavigator();
//context

export default function DrawerNavigator() {
    const [context, setContext] = useContext(Context);
    return (
        <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashHome} />
        <Drawer.Screen name="Add New Appointment" component={AddAppointment} />
        <Drawer.Screen name="Notifications [1]" component={NotificationsScreen} />
        <Drawer.Screen name="View Appointments" component={ViewAppoinmtments} />
        {
          context.role == 'lecturer' ?
        
        (<Drawer.Screen name="Add Staff" component={AddStaffScreen} />)  :
        <Text></Text> 
        }
        <Drawer.Screen name="Update Appointments" component={UpdateScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Logout" component={Logout} />
        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
        </Drawer.Navigator>
    )
}
