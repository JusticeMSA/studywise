import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native'
import { Context } from "../context";
import {firebase} from '../firebaseConfig'

import MenuBar from './MenuBar'

export default function NotificationsScreen({navigation}) {

    const [context, setContext] = useContext(Context)
    const [notifications, setNotifications] = useState([])
    const [viewing, setViewing] = useState(false)
    const [current, setCurrent] = useState()
    const [message, setMessage] = useState("")

    useEffect(() => {
        get()
    }, [viewing])

    async function get(){

        const arr = [];

        const appRef = await firebase.firestore().collection('notifications')
        const snapshot = await appRef.where('student', '==', `${context.user_id}`).get()



        if (snapshot.empty) {
            alert("You do not have any messages")
            return;
          }
        
          snapshot.forEach(doc => {
        
            arr.push(
                {   date: doc.data().date, 
                    from: doc.data().from, 
                    id: doc.data().id, 
                    lem: doc.data().lem, 
                    message: doc.data().message, 
                    read: doc.data().read, 
                    subject: doc.data().subject})
                    
                });

        setNotifications(arr)
    }

    async function reply(){

        const date = new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-')
        const id = Math.floor(Math.random() * 100000000000)
        
        const data = {
            date: date,
            from: `${context.surname} ${context.initial}`,
            id: id,
            lem: notifications[current].lem,
            message: message,
            read: false,
            student: context.user_id,
            subject: notifications[current].subject
        }
        const res =  await firebase.firestore().collection('notifications').doc(`${id}`).set(data);
        alert('Reply sent')
        setViewing(false)
    }

    function checkInput(){

        if (!message.trim()) {
            alert('Message cannot be empty!');
            return;
          }
          return true
    }

    return (
        <View style={{flex: 1}}>
            <MenuBar open={() =>{navigation.openDrawer()}}/>
            <View style={styles.container}>
                <ScrollView>
                    <View>
                    {
                        notifications.map((not, index) =>{
                            return(
                                <TouchableOpacity
                                onPress={() => {

                                    setCurrent(index)
                                    setViewing(true)

                                }}
                                    style={styles.notificationRow}
                                >
                                    <Text style={{color: "#3fcc57"}}>{not.subject}</Text>
                                    <Text style={{color: "#737272"}}>{not.from}</Text>
                                    <Text style={{color: "#737272"}}>{`${not.message.substring(0, 15)}..`}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </View>
                

                </ScrollView>
                {
                    viewing ?
                    (
                        <View style={styles.view}>
                    <Text style={styles.boldtext}>FROM: {notifications[current].from}</Text>
                    <Text style={styles.boldtext}>SUBJECT: {notifications[current].subject}</Text>
                    <Text style={styles.boldtext}>MESSAGE:</Text>
                    
                    
                    <Text style={{color: "#b8b8b8"}}>{notifications[current].message}</Text>
                    
                    <View style={styles.replyblock}>
                    <TextInput 
                        style={styles.formComment}
                        onChangeText={
                            (value) => setMessage(value)
                          }
                        multiline = {true}
                        placeholder ="Reply"
                        numberOfLines = {2}
                        // onChangeText={
                        //     (value) => setComment(value)
                        //   }
                    />
                    
                    <TouchableOpacity
                        style={styles.sendbtn}
                        onPress={() => {
                            const ready = checkInput()
                            if(ready){
                                reply()
                            }
                        }}
                    >
                        <Text style={{color: "#ffffff"}}>Send</Text>
                    </TouchableOpacity>
                    
                    </View>
                    <View style={styles.bts}>
                    <Button
                        title="Back"
                        onPress={() => {setViewing(false)}}
                    />
                    <Button
                    style={{marginLeft: 15}}
                        title="Delete"
                        color= "red"
                    />
                    </View>
                </View>
                    ) : 
                    <Text></Text>
                }
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
        height: 60,
        backgroundColor: "#FFFFFF",
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    scroll: {
        flexGrow: 1,
        height: 700
    },
    view: {
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: "#ffffff",
        zIndex: 100,
        padding: 10,
    },
    formComment: {
        width: "80%",
        padding: 5,
        borderColor: "#e6e6e6",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        bottom: 0,
        
    },
    boldtext: {
        color: "#808080",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    replyblock: {
        flex: 1,
        width: "100%",
        padding: 10,
        flexDirection: "row",
        position: "absolute",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        bottom: 50,
    },
    bts: {
        flex: 1,
        width: "50%",
        padding: 10,
        flexDirection: "row",
        position: "absolute",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        bottom: 150,
    },
    sendbtn: {
        backgroundColor: "#1ddbbf",
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
        borderRadius: 10,
        marginLeft: 5,
    }
})
