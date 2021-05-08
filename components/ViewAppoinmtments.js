import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper';

import MenuBar from './MenuBar'

export default function ViewAppoinmtments({navigation}) {
    return (
        <View>
            <MenuBar open={() =>{navigation.openDrawer()}}/>
            <ScrollView style={styles.scroll} horizontal={true}>
                    <DataTable style={styles.table}>
                        <DataTable.Header style={styles.table}>
                        <DataTable.Title>Subject</DataTable.Title>
                        <DataTable.Title >Date</DataTable.Title>
                        <DataTable.Title >Time</DataTable.Title>
                        <DataTable.Title >Status</DataTable.Title>
                        <DataTable.Title >Type</DataTable.Title>
                        <DataTable.Title >Vanue</DataTable.Title>
                        <DataTable.Title >Mentor/Lecturer</DataTable.Title>
                        <DataTable.Title >Comment</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row style={styles.table}>
                        <DataTable.Cell>dfgd</DataTable.Cell>
                        <DataTable.Cell >159</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row style={styles.center}>
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
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        height: "100%"
    },
    scroll: {
        marginTop: 50,
    },
    rowWidth: {
        width: 50
    },
    table: {
        width: 500
    },
    center: {
        textAlign: "center"
    }
})
