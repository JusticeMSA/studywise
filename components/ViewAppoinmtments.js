import React, {useState, useContext, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';
import { Picker as Pick } from '@react-native-community/picker'
import DatePicker from 'react-native-datepicker';
import {Context} from '../context'
import {firebase} from '../firebaseConfig'

import MenuBar from './MenuBar'

export default function ViewAppoinmtments({navigation}) {

    //Subject
    const [subject, setSubject] = useState();
    //Date
    const [date, setDate] = useState("")

    const [filtered, setFiltered] = useState([])

    const [context, setContext] = useContext(Context);
    const[apps, setApps] = useState([])
    const [subs, setSubs] = useState([])

    useEffect(() =>{
        get()
    }, [])

    async function get(){

        const arr = [];

        const appRef = await firebase.firestore().collection('appointments')
        const snapshot = await appRef.where('student', '==', `${context.user_id}`).orderBy('app_date').get()

        const usersRef = await firebase.firestore().collection('users').doc(`${context.user_id}`).get()
        const snap = await usersRef.data()
        setSubs(snap.subjects)

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
                    teacher: doc.data().teacher, 
                    teacher_id: doc.data().teacher_id, 
                    comment: doc.data().app_comment})
                    
                });

        setApps(arr)
    }
    function filterArray(){

        if(!subject.trim()){
            alert('empty')
        }else{
            alert ('not em,pty', subject)
        }
    }

    return (
        <View style={{flex: 1}}>
            <MenuBar open={() =>{navigation.openDrawer()}}/>
            <ScrollView>
            <View style={{flex: 1}}>
            <Text style={styles.appointmentsHeader}>Appointments</Text>
                <View style={styles.form}>
                    <View style={styles.formPicker}>
                    <Pick
                        selectedValue={subject}
                        style={{height: 50, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                            {
                                setSubject(itemValue);
                                console.log(subject)
                                
                            }
                        }
                    >
                    {
                        subs.map((sub, index) => {
                            
                           return <Pick.Item label={sub} value={sub} key={sub} />
                           
                        })
                    }
                    </Pick>
                    </View>
                    <View style={styles.formGroup}>
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={date} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate="01-01-2020"
                        maxDate="01-01-2050"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                            display: 'none',
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                            },
                            dateInput: {
                            marginLeft: 36,
                            },
                        }}
                        onDateChange={(date) => {
                            setDate(date);
                        }}
                        />
                    </View>
                    
                </View>
                <View style={styles.formGroup}>
                    <TouchableOpacity 
                        style={styles.formButton}
                        onPress={() => 
                            filterArray()
                        }
                    >
                        <Text style={styles.formButtonText}>Filter Appointments</Text>
                    </TouchableOpacity>
                </View>
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
            </ScrollView>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        height: "100%"
    },
    scroll: {
        marginTop: 50,
    },
    rowWidth: {
        width: 50
    },
    table: {
        width: 800
    },
    center: {
        textAlign: "center"
    },
    appointmentsHeader: {
        fontSize: 20,
        color: "#707070",
        marginTop: 50,
        paddingLeft: 10
    },
    form :{
        width: "100%",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
        flexDirection: "row",
        // justifyContent: "center",
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
        paddingLeft: 10
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
    formComment: {
        width: "100%",
        padding: 5,
        borderColor: "#e6e6e6",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
    },
    formButton: {
        width: "50%",
        height: 35,
        borderRadius: 5,
        backgroundColor: "#0d58d1",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        marginLeft: 0,
        textAlign: "center",
        alignSelf: "center"
    },
    formButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    formPicker: {
        height: 50,
        width: "40%",
        borderColor: "#e6e6e6",
        justifyContent: "space-between",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        marginLeft: 10

    },
    radio: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    }

})
