import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Context } from "../context";

export default function Logout({navigation}) {

    const [context, setContext] = React.useContext(Context);
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Are you sure you want to logout?</Text>
            <TouchableOpacity 
            onPress={() => {
                navigation.navigate('Home')
                setContext()
            }}
            style={styles.btn}>
                <Text style={{color: "green", fontSize: 18}}>Yes</Text>
                </TouchableOpacity>
            <TouchableOpacity 
            onPress={() =>{
                navigation.goBack()
            }}
            style={styles.btn}>
                <Text style={{color: "red", fontSize: 18}}>No</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        color: "#121212",
        fontSize: 20,
        marginBottom: 40,
    },
    btn: {
        padding: 20,
    }
})