import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';

export default function Home({navigation}){

    return(

        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>STUDYWISE</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0d58d1",
        padding: 20,
    },
    heading: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold"
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        backgroundColor: "#fff",
        width: 100,
        height: 35,
        borderRadius: 5,

    },
    buttonText: {
        color: "#0d58d1",
        fontSize: 16
    }
});

