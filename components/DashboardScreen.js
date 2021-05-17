import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, {useContext, useState, useEffect} from 'react'
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { Context } from "../context";
import {firebase} from '../firebaseConfig'
import CountDown from 'react-native-countdown-component';

import MenuBar from './MenuBar'

export default function DashboardScreen({navigation}) {

    const [context, setContext] = useContext(Context);
    const[apps, setApps] = useState([])
    const[appsNum, setAppsNum] = useState([])

    useEffect(() =>{
        get()
    }, [])

    async function get(){

        if(context.role !== "student"){
            return
        }

        const arr = [];
        const count = [];

        const appRef = await firebase.firestore().collection('appointments')
        const snapshot = await appRef.where('student', '==', `${context.user_id}`).orderBy('app_date').orderBy('time').get()

        const appNum = await firebase.firestore().collection('appointments')
        const appNumSnap = await appNum.where('teacher_id', '==', `${context.user_id}`).get()
        
        if (snapshot.empty) {
            // alert("You do not have any appointments")
            return;
        }
        
        appNumSnap.forEach(doc => {
            
            count.push(
                doc.data())
                
            });
            console.log(count)
            setAppsNum(count.length)
          snapshot.forEach(doc => {
        
            arr.push(
                {   subject: doc.data().subject, 
                    date: doc.data().app_date, 
                    time: doc.data().time, 
                    status: doc.data().app_status, 
                    type: doc.data().app_type, 
                    venue: doc.data().lab_name, 
                    teacher: doc.data().teacher, 
                    teacher_id: doc.data().teacher_id, 
                    comment: doc.data().app_comment})
                    
                });

        setApps(arr)
    }

    return (

        <View style={{flex: 1}}>
            <MenuBar 
            open={() =>{navigation.openDrawer()}}
            navigation={navigation}
            
            />
            <ScrollView >
                <View style={styles.container}>
                <Text style={styles.heading}>Next Appointment in</Text>
                <View style={styles.arow}>
                <CountDown
                    until={163865520000}
                    onFinish={() => alert('finished')}
                    onPress={() => alert('hello')}
                    size={20}
                />

                </View>

                {
                    context.role == "student" ?
                    (
                        <View style={styles.appointments}>
                    <Text style={styles.appointmentsHeader}>Appointments</Text>
                    <ScrollView style={styles.scroll} horizontal={true}>
                    <DataTable style={styles.table}>
                        <DataTable.Header>
                        <DataTable.Title style={{justifyContent: "center"}}>Subject</DataTable.Title>
                        <DataTable.Title style={{justifyContent: "center"}} >Date</DataTable.Title>
                        <DataTable.Title style={{justifyContent: "center"}} >Time</DataTable.Title>
                        <DataTable.Title style={{justifyContent: "center"}} >Status</DataTable.Title>
                        <DataTable.Title style={{justifyContent: "center"}} >Type</DataTable.Title>
                        <DataTable.Title style={{justifyContent: "center"}} >Venue</DataTable.Title>
                        <DataTable.Title style={{justifyContent: "center"}} >Mentor/Lecturer</DataTable.Title>
                        <DataTable.Title style={{justifyContent: "center"}} >Comment</DataTable.Title>
                        </DataTable.Header>
                        {
                            apps.map((i) =>{
                                return (<DataTable.Row>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.subject}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.date}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.time}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.status}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.type}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.venue}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.teacher}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.comment}</DataTable.Cell>
                            </DataTable.Row>)
                            })
                        }
                        
                        

                        
                            
                            
                           
                           
                       
                    

                        
                    </DataTable>
                    </ScrollView>
                </View>
                    )
                    : 
                    (
                        <View style={styles.container}>
                        <View style={styles.brow}>
                            <View style={styles.boxer}>
                                <Text style={styles.btext1}>TOTAL APPOINTMENTS MADE</Text>
                                <Text style={styles.num}>4</Text>
                            </View>
                            <View style={styles.boxer}>
                                <Text style={styles.btext2}>NUMBER OF LECTURERS</Text>
                                <Text style={styles.num}>1</Text>
                            </View>
                        </View>
                        <View style={styles.brow}>
                            <View style={styles.boxer}>
                                <Text style={styles.btext3}>NUMBER OF MENTORS</Text>
                                <Text style={styles.num}>1</Text>
                            </View>
                            <View style={styles.boxer}>
                                <Text style={styles.btext4}>NUMBER OF STUDENTS</Text>
                                <Text style={styles.num}>1</Text>
                            </View>
                        </View>
                        </View>
                    )
                }
                
                </View>
            </ScrollView>
                <TouchableOpacity
                    onPress={get}
                    style={styles.refresh}
                >
                    <Text style={{color: "#ffffff"}}>Refresh</Text>
                </TouchableOpacity>
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
        width: "100%",
    },
    heading: {
        fontSize: 25,
        color: "#828282"
    },
    scroll: {
        width: "100%"
    },
    appointments: {
        marginTop: 50,
        width: "100%",
    },
    appointmentsHeader: {
        fontSize: 20,
        color: "#707070",
    },
    table: {
        width: 800
    },
    refresh: {
        position: "absolute",
        bottom: 0,
        right: 5,
        width: 80, 
        height: 80,
        backgroundColor: "#12cc82",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    arow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10,

    },
    box: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    one: {
        color: "#828282",
        fontSize: 40,
        fontWeight: "bold",
    },
    two: {
        fontSize: 10,
    }, 
    brow :{
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    boxer: {
        width: 150,
        height: 150,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    num: {
        color: "#5a5c69",
        fontSize: 28,
    },
    btext1: {
        fontSize: 9,
         color: "#4e73df"
    },
    btext2: {
        fontSize: 9,
         color: "#1cc88a"
    },
    btext3: {
        fontSize: 9,
         color: "#36b9cc"
    },
    btext4: {
        fontSize: 9,
         color: "#f6c23e"
    },
})