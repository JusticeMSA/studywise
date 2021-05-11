import React, {useContext, useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import MenuBar from './MenuBar'
import {firebase} from '../firebaseConfig'
import {Context} from '../context'

export default function ChangePassword({navigation}) {

    const [context, setContext] = useContext(Context);
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [repeat, setRepeat] = useState("")

    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!oldPassword.trim()) {
          alert('Please Enter Old Password');
          return;
        }
        //Check for the Email TextInput
        if (!password.trim()) {
          alert('Please Enter New Password');
          return;
        }
        //Check for the Email TextInput
        if (!repeat.trim()) {
          alert('Please Confirm Password');
          return;
        }
        if (password !== repeat ){
            alert('Passwords do not match');
             return;
        }
        update(context.user_id, password)
      };

      
      const update = async (id, password) =>{

        const usersRef = await firebase.firestore().collection('users').doc(`${id}`).update({
            password: password
        }); 
        alert('Profile Password Changed!!')
        navigation.navigate('Profile')

      }

    return (
        <View style={{flex: 1}}>
            <MenuBar 
            open={() =>{navigation.openDrawer()}}
            navigation={navigation}
            
            />


            <View>
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Old Password</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Old Password"
                        onChangeText={
                            (value) => setOldPassword(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>New Password</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="New Password"
                        onChangeText={
                            (value) => setPassword(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Repeat Password</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Repeat Password"
                        onChangeText={
                            (value) => setRepeat(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <TouchableOpacity 
                    onPress={checkTextInput}
                        style={styles.formButton}
                    >
                        <Text style={styles.formButtonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    
    form :{
        width: "100%",
        height: "90%",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
        
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
})
