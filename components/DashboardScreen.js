import React from 'react'
import { View, SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper';

import MenuBar from './MenuBar'

export default function DashboardScreen({navigation}) {
    return (

        <View>
            <MenuBar open={() =>{navigation.openDrawer()}}/>
            <View style={styles.container}>
                <Text style={styles.heading}>Next Appointment in</Text>
                <View>
                    <Text>20 Days : 10 Hours : 55 Months : 23 Seconds</Text>
                </View>

                <View style={styles.appointments}>
                    <Text style={styles.appointmentsHeader}>Appointments</Text>
                    <ScrollView style={styles.scroll} horizontal={true}>
                    <DataTable style={styles.table}>
                        <DataTable.Header>
                        <DataTable.Title>Subject</DataTable.Title>
                        <DataTable.Title >Date</DataTable.Title>
                        <DataTable.Title >Time</DataTable.Title>
                        <DataTable.Title >Status</DataTable.Title>
                        <DataTable.Title >Type</DataTable.Title>
                        <DataTable.Title >Vanue</DataTable.Title>
                        <DataTable.Title >Mentor/Lecturer</DataTable.Title>
                        <DataTable.Title >Comment</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                        <DataTable.Cell>dfgd</DataTable.Cell>
                        <DataTable.Cell >159</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                        <DataTable.Cell>sdssd</DataTable.Cell>
                        <DataTable.Cell >237</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        </DataTable.Row>

                        
                    </DataTable>
                    </ScrollView>
                </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({

    container: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center"
    },
    heading: {
        fontSize: 22
    },
    scroll: {
        width: "100%"
    },
    appointments: {
        marginTop: 100,
        width: "100%",
    },
    appointmentsHeader: {
        fontSize: 20,
        color: "#707070",
    },
    table: {
        width: 600
    }
})