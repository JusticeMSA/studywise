import React, {useContext, useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView,TextInput, TouchableOpacity } from 'react-native'
import MenuBar from './MenuBar'
import {Context} from '../context'
import {firebase} from '../firebaseConfig'
import EditProfile from './EditProfile'


export default function ProfileScreen({navigation}) {

    const [context, setContext] = useContext(Context);
    const [edit, setEdit] = useState(true);

    //Input
    const [surname, setSurname] = useState(context.surname);
    const [initial, setInitial] = useState(context.initial);
    const [email, setEmail] = useState(context.email);
    const [phone, setPhone] = useState(context.phone);
    
    useEffect(() => {
        get()
    }, [])

    async function get(){

        const arr = [];

        const appRef = await firebase.firestore().collection('appointments')
        const snapshot = await appRef.where('teacher_id', '==', `${context.user_id}`).get()



        if (snapshot.empty) {
            alert(context.user_id)
            return;
          }
        
          snapshot.forEach(doc => {
        
            arr.push(
                {   date: doc.data().date, 
                    from: doc.data().from, 
                    id: doc.data().id, 
                    teacher: doc.data().teacher, 
                    message: doc.data().message, 
                    read: doc.data().read, 
                    subject: doc.data().subject})
                    
                });

        // setNotifications(arr)
        console.log(arr)
    }

    const checkTextInput = () => {

        if (!surname.trim()) {
          alert('Please Enter Surname');
          return;
        }
        if (!initial.trim()) {
          alert('Please Enter Initials');
          return;
        }
        if (!email.trim()) {
          alert('Please Enter Email');
          return;
        }
        if (!phone.trim()) {
          alert('Please Enter Phone');
          return;
        }
        
        update(context.user_id, surname, initial, email, phone)
      };

      const update = async (id, surname, initial, email, phone) =>{

        const usersRef = await firebase.firestore().collection('users').doc(`${id}`).update({
            email: email,
            initial: initial,
            phone: phone,
            surname: surname
        }); 
        alert('Profile Edited!!')

      }

    return (
        <View style={{flex: 1, alignItems: "center"}}>
            <MenuBar 
            open={() =>{navigation.openDrawer()}}
            navigation={navigation}
            
            />
            <ScrollView style={{flex: 1}}>
            
            <View style={styles.container}>
                <Text style={styles.heading}>Profile</Text>
                <Image
                style={styles.image}
                    source={{uri: 'https://www.physiorehabgroup.co.nz/wp-content/uploads/generic-profile-square-580x580-300x300.jpg'}}
                />
                <Text style={styles.name}>{`${context.initial} ${context.surname}`}</Text>
                <Text style={styles.userid}>{context.user_id}</Text>
                <View style={styles.row}>
                    <View style={styles.box}>
                        <Text style={styles.sh}>Appointments</Text>
                        <Text style={styles.bh}>12</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.sh}>Subjects</Text>
                        <Text style={styles.bh}>12</Text>
                    </View>
                </View>
                
            </View> 
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Surname</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Surname"
                        value={surname}
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
                        value={initial}
                        onChangeText={
                            (value) => setInitial(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={
                            (value) => setEmail(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Phone No</Text>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Phone No"
                        value={phone}
                        onChangeText={
                            (value) => setPhone(value)
                          }
                    />
                </View>
                <View style={styles.formGroup}>
                    <TouchableOpacity 
                    onPress={checkTextInput}
                        style={styles.formButton}
                    >
                        <Text style={styles.formButtonText}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                onPress={() => {navigation.navigate('ChangePassword')}}
                style={{width: "100%", alignItems: "center"}}
                >
                    <Text style={{color: "blue"}}>Change Password</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        fontSize: 20,
        color: "grey",
        marginBottom: 20,
    },
    image: {
        width:150,
        height: 150,
        borderRadius: 100
    },
    name: {
        color: "grey",
        fontSize: 20
    },
    userid: {
        fontSize: 18,
        color: "black"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 10,
    },
    box: {
        width: "50%",
        height: 50,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    sh: {
        color: "#34abeb",
        fontSize: 16,
    }, 
    bh: {
        fontSize: 20
    },
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
