import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import {firebase} from '../firebaseConfig'
import { Context } from "../context";
import { NavigationContainer } from '@react-navigation/native';




export default function RegisterScreen({navigation}) {

    const [context, setContext] = React.useContext(Context);
    const [username, setUsername] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [initials, setInitials] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rePassword, setRePassword] = React.useState('');

    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!username.trim()) {
          alert('Please Enter username');
          return;
        }
        //Check for the Email TextInput
        if (!password.trim()) {
          alert('Please Enter password');
          return;
        }
        if (!rePassword.trim()) {
          alert('Please re-type password');
          return;
        }
        if (!phone.trim()) {
          alert('Please Enter cell number');
          return;
        }
        if (!email.trim()) {
          alert('Please Enter Email');
          return;
        }
        if (!initials.trim()) {
          alert('Please Enter Initials');
          return;
        }
        if (!surname.trim()) {
          alert('Please Enter Surname');
          return;
        }
        if (password != rePassword) {
          alert('Passwords do not match');
          return;
        }


        const data = {
            email: email,
            initial: initials,
            password: password,
            phone: phone,
            pic: "placeholder.jpg",
            role: "student",
            surname: surname,
            user_id: username
        }
        
        login(data)
      };

      const login = async (data) =>{

       

        try{
            const res =  await firebase.firestore().collection('users').doc(`${username}`).set(data);
            alert('User Registered'),
            navigation.navigate('Login')
          }catch(e){
              alert('Something went wrong!!')
              console.log(e)
          }

      }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
            <View style={styles.form}>
                <Text style={styles.heading}>Register</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Student Number</Text>
                    <TextInput 
                        style={styles.formInput}
                        textContentType="username"
                        placeholder="Student Number"
                        onChangeText={
                            (value) => setUsername(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Surname</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Surname"
                        onChangeText={
                            (value) => setSurname(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Initials</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Initials"
                        onChangeText={
                            (value) => setInitials(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Email"
                        onChangeText={
                            (value) => setEmail(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Cell Number</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Cell Number"
                        onChangeText={
                            (value) => setPhone(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Password</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={
                            (value) => setPassword(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Retype password</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Retype password"
                        secureTextEntry={true}
                        onChangeText={
                            (value) => setRePassword(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <TouchableOpacity 
                        style={styles.formButton}
                        onPress={checkTextInput}
                    >
                        <Text style={styles.formButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                onPress={() =>{
                    navigation.navigate('Login')
                }}
                >
                    <Text style={{color: "blue"}}>Login instead</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    scroll: {
        width: "100%",
        height: "100%",
    },
    form :{
        width: "100%",
        // height: "90%", 
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