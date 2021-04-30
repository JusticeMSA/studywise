import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

export default class SafeContainer extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>

            </SafeAreaView>
        )
    }
}
 const styles = {
     container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
     },
 }