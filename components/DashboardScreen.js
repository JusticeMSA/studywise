import React from 'react'
import { View, SafeAreaView, Text, StyleSheet } from 'react-native'
import {DrawerActions} from '@react-navigation/native'

import MenuBar from './MenuBar'

export default function DashboardScreen({navigation}) {
    return (

        <View style={styles.container}>
            <MenuBar open={() =>{navigation.openDrawer()}}/>
        </View>

    )
}
const styles = StyleSheet.create({

    container: {
        // marginTop: 75
    },
})