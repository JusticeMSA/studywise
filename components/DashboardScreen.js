import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, {useContext, useState, useEffect, useLayoutEffect} from 'react'
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';
import { Context } from "../context";
import {firebase} from '../firebaseConfig'

import MenuBar from './MenuBar'

export default function DashboardScreen({navigation}) {

    const [context, setContext] = useContext(Context);
    const[apps, setApps] = useState([])

    useEffect(() =>{
        get()
    }, [])

    async function get(){

        const arr = [];

        const appRef = await firebase.firestore().collection('appointments')
        const snapshot = await appRef.where('student', '==', `${context.user_id}`).get()

        if (snapshot.empty) {
            alert("You do not have any appointments")
            return;
          }
        
          snapshot.forEach(doc => {
        
            arr.push(
                {   subject: doc.data().subject, 
                    date: doc.data().app_date, 
                    time: doc.data().time, 
                    status: doc.data().app_status, 
                    type: doc.data().app_type, 
                    venue: doc.data().lab_name, 
                    lem: doc.data().lem, 
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
                    <View style={styles.box}>
                        <Text style={styles.one}>22</Text>
                        <Text style={styles.two}>days</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.one}>14</Text>
                        <Text style={styles.two}>hours</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.one}>3</Text>
                        <Text style={styles.two}>minutes</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.one}>21</Text>
                        <Text style={styles.two}>seconds</Text>
                    </View>

                </View>

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
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.lem.name}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.comment}</DataTable.Cell>
                            </DataTable.Row>)
                            })
                        }
                        
                        

                        
                            
                            
                           
                           
                       
                    

                        
                    </DataTable>
                    </ScrollView>
                </View>
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
    }
})