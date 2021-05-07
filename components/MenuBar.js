import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function MenuBar({open}) {
    return (
        <View style={styles.bar}>
            <TouchableOpacity
                style={styles.menuBtn}
                onPress={() => open()}
            >
                <View style={styles.line}></View>
                <View style={styles.line}></View>
                <View style={styles.line}></View>
            </TouchableOpacity>
            <Text style={styles.logo}>STUDYWISE</Text>
            <View>
            <TouchableOpacity style={styles.profile}>   
            </TouchableOpacity>            

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    bar: {
        width: "100%",
        height: 75,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    menuBtn: {
        width: 30,
        height: 30,
        justifyContent: "space-around"
    },
    line: {
        backgroundColor: "#262626",
        width: "100%",
        height: 4,
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: "#262626"
    },
    logo: {
        color: "#0d58d1",
        fontSize: 20
    }
    
})