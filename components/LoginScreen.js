import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import {firebase} from '../firebaseConfig'
import { Context } from "../context";
import { NavigationContainer } from '@react-navigation/native';




export default function LoginScreen({navigation}) {

    const [context, setContext] = React.useContext(Context);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [example, setExample] = React.useState();

    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!username.trim()) {
          alert('Please Enter Name');
          return;
        }
        //Check for the Email TextInput
        if (!password.trim()) {
          alert('Please Enter Email');
          return;
        }
        
        login(username, password)
      };

      const login = async (username, password) =>{

        const usersRef = await firebase.firestore().collection('users').doc(`${username}`).get()
        const snapshot = await usersRef.data();
        
        if (snapshot.password !== password) {
            alert('Incorrect username or password');
            return;
          }else{
              
            setContext(snapshot)
            navigation.navigate('Dashboard', {user: snapshot})

            
          }

      }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.heading}>Login</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Username</Text>
                    <TextInput 
                        style={styles.formInput}
                        textContentType="username"
                        placeholder="Username"
                        onChangeText={
                            (value) => setUsername(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Password</Text>
                    <TextInput 
                        style={styles.formInput}
                        textContentType="password"
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={
                            (value) => setPassword(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <TouchableOpacity 
                        style={styles.formButton}
                        onPress={checkTextInput}
                    >
                        <Text style={styles.formButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                onPress={() =>{
                    navigation.navigate('Register')
                }}
                >
                    <Text style={{color: "blue"}}>Register a new account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    form :{
        width: "90%",
        height: "90%",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        
    },
    heading: {
        color: "#0d58d1",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
    },
    formGroup : {
        marginTop: 15,
        marginBottom: 10,
        width: "100%",
    },
    formLabel: {
        color: "#5f6368",
    },
    formInput: {
        width: "100%",
        height: 35,
        padding: 5,
        borderColor: "#e6e6e6",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
    },
    formButton: {
        width: "100%",
        height: 35,
        borderRadius: 5,
        backgroundColor: "#0d58d1",
        alignItems: "center",
        justifyContent: "center",
    },
    formButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    radio: {
        flexDirection: "row",
        alignItems: "center"
    }
})