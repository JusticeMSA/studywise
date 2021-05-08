import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'


import MenuBar from './MenuBar'

export default function NotificationsScreen({navigation}) {
    return (
        <View>
            <MenuBar open={() =>{navigation.openDrawer()}}/>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.notificationRow}
                >
                    <Text>DSHO3</Text>
                    <Text>DSHO3</Text>
                    <Text>(KM. Kabini)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.notificationRow}
                >
                    <Text>DSdsadaHO3</Text>
                    <Text>DSHO3</Text>
                    <Text>(KM. Kabini)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.notificationRow}
                >
                    <Text>DSHO3</Text>
                    <Text>DSHO3</Text>
                    <Text>(KM. Kabini)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.notificationRow}
                >
                    <Text>DSHO3</Text>
                    <Text>DSHO3</Text>
                    <Text>(KM. Kabini)</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    notificationRow: {
        width: "100%",
        height: 50,
        backgroundColor: "#e3e3e3",
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    scroll: {
        flexGrow: 1,
        height: 700
    },
})
