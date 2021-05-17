import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, {useContext, useState, useEffect, useLayoutEffect} from 'react'
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native'
import { DataTable } from 'react-native-paper';
import { Context } from "../context";
import DatePicker from 'react-native-datepicker';
import {Picker as Pick} from '@react-native-community/picker';
import { RadioButton } from 'react-native-paper'
import {firebase} from '../firebaseConfig'

import MenuBar from './MenuBar'

export default function DashboardScreen({navigation}) {

    const [context, setContext] = useContext(Context);
    const[apps, setApps] = useState([])
    const[current, setCurrent] = useState()
    const[updating, setUpdating] = useState(false)

    //Form inputs
    //subject
    const [subject, setSubject] = useState("");
    //Lecturer or Mentor
    const [selectedLect, setSelectedLect] = useState("");
    //Date
    const [date, setDate] = useState("")
    //Time
    const [time, setTime] = useState("08:00")
    //Type
    const [selectedType, setSelectedType] = useState("lab");
    //Comment
    const [comment, setComment] = useState("")
    const[subs, setSubs] = useState([])
    const[id, setId] = useState("")

    useEffect(() =>{
        get()
    }, [])

    async function get(){

        const arr = [];

        const appRef = await firebase.firestore().collection('appointments')
        const snapshot = await appRef.where('student', '==', `${context.user_id}`).orderBy('app_date').get()

        if (snapshot.empty) {
            alert("You do not have any appointments")
            return;
          }
        
          snapshot.forEach(doc => {
        
            arr.push(
                {   subject: doc.data().subject, 
                    date: doc.data().app_date, 
                    time: doc.data().time, 
                    app_id: doc.data().app_id,
                    status: doc.data().app_status, 
                    type: doc.data().app_type, 
                    venue: doc.data().lab_name, 
                    teacher: doc.data().teacher, 
                    teacher_id: doc.data().teacher_id, 
                    comment: doc.data().app_comment})
                    
                });

        setApps(arr)
    }

    async function fetch(){
        const usersRef = await firebase.firestore().collection('users').doc(`${context.user_id}`).get()
        const snapshot = await usersRef.data()
        setSubs(snapshot.subjects)
    }

    const getLect = async function() {
        
        let arr = []

        const subjectRef = await firebase.firestore().collection('users')
        const snapshot = await subjectRef.where('subjects', 'array-contains', `${subject}`).where('role', 'in', ['mentor', 'lecturer']).get()          
        if (snapshot.empty) {
            alert("There is not lecturer/mentor assigned to that subject")
            return;
          }
          snapshot.forEach(doc => {
            
            arr.push({name: `${doc.data().initial} ${doc.data().surname}`, id: doc.data().user_id})
            // setSelectedLect(arr)
            
          });
    }

    const checkInput = async () =>{

      
        
        if (!subject.trim()) {
            alert('Subject Cannot be empty');
            return;
          }
        if (!selectedLect.trim()) {
            alert('Lecturer/Mentor cannot be empty');
            return;
          }
        if (!date.trim()) {
            alert('Date cannot be empty');
            return;
          }
        if (!time.trim()) {
            alert('Time cannot be empty');
            return;
          }
        if (!selectedType.trim()) {
            alert('Appointment type  cannot be empty');
            return;
          }
        if (!comment.trim()) {
            alert('Comment type  cannot be empty');
            return;
          }

          const data = {
              app_comment: comment,
              app_date: date,
              app_id: apps[current].app_id,
              app_link: "",
              app_status: "Not Confirmed",
              app_type: selectedType,
              lab_name: "",
              teacher: "Lambani DV",
              teacher_id: "54321",
              student: context.user_id,
              subject: subject,
              time: time
          }
          try{
            const res =  await firebase.firestore().collection('appointments').doc(`${apps[current].app_id}`).set(data);
            alert('Appointment updated'),
            setUpdating(false)
          }catch(e){
              alert('Something went wrong!!')
              console.log(e)
          }

         
    }

    return (

        <View style={{flex: 1}}>
            <MenuBar 
            open={() =>{navigation.openDrawer()}}
            navigation={navigation}
            
            />
            <ScrollView >
                <View style={styles.container}>

                {
                    updating ?
                    (
                        
                        <View style={styles.form}>
                        <Text style={styles.heading}>Add Appointment</Text>
                        <View style={styles.arow}>
                            <Button
                            title="Cancel"
                            color="red"
                            onPress={() =>{
                                setUpdating(false)
                            }}
                            
                            />
                        </View>
        
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Subject</Text>
                            <View style={styles.formPicker}>
                            <Pick
                                selectedValue={subject}
                                style={{height: 50, width: 100}}
                                onValueChange={(itemValue, itemIndex) =>
                                    {
                                        setSubject(itemValue);
                                        getLect()
                                        
                                    }
                                }
                            >
                            {
                                subs.map((sub, index) => {
                                   return <Pick.Item label={sub} value={sub} />
                                   
                                })
                            }
                            </Pick>
                            </View>
                            
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Lecturer/Mentor</Text>
                            <View style={styles.formPicker}>
                            <Pick
                                selectedValue={selectedLect}
                                style={{height: 50, width: 100}}
                                onValueChange={(itemValue, itemIndex) =>
                                    {
                                        setSelectedLect(itemValue);
                                        
                                    }
                                }
                            >
                                <Pick.Item label="FGH" value="HELLO" />
                                <Pick.Item label="sdfs" value="sdfsdsdfsd" />
                            {/* {
                                selectedLect.map((sub, index) => {
                                    return <Pick.Item label={sub.namr} value={sub.id} />
                                })
                            } */}
                            </Pick>
                            </View> 
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Date</Text>
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
                                    //display: 'none',
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
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Time</Text>
                            <View style={styles.formPicker}>
                            <Pick
                                selectedValue={time}
                                style={{height: 50, width: 100}}
                                onValueChange={(itemValue, itemIndex) =>
                                    {
                                        setTime(itemValue);
                                        
                                    }
                                }
                            >
                                <Pick.Item label="08:00" value="08:00" />
                                <Pick.Item label="09:00" value="09:00" />
                                <Pick.Item label="10:00" value="10:00" />
                                <Pick.Item label="11:00" value="11:00" />
                                <Pick.Item label="12:00" value="12:00" />
                                <Pick.Item label="13:00" value="13:00" />
                                <Pick.Item label="14:00" value="14:00" />
                                <Pick.Item label="15:00" value="15:00" />
                                <Pick.Item label="16:00" value="16:00" />
                            </Pick>
                            </View>
                        </View>
                        <View style={styles.radio}>
                            <Text style={styles.formLabel}>Lab</Text>
                            <RadioButton
                                value="lab"
                                status={ selectedType === 'lab' ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedType('lab')}
                                color="#0d58d1"
                            />
                            <Text style={styles.formLabel}>Online</Text>
                            <RadioButton
                                value="lab"
                                status={ selectedType === 'online' ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedType('online')}
                                color="#0d58d1"
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Comment</Text>
                            <TextInput 
                                style={styles.formComment}
                                multiline = {true}
                                numberOfLines = {8}
                                onChangeText={
                                    (value) => setComment(value)
                                  }
                            />
                        </View>
                        <View style={styles.radio}>
                            <TouchableOpacity 
                                style={styles.formButton}
                                onPress={checkInput}
                            >
                                <Text style={styles.formButtonText}>Add Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    ) :
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
                        <DataTable.Title style={{justifyContent: "center"}} ></DataTable.Title>
                        </DataTable.Header>
                        {
                            apps.map((i, index) =>{
                                return (<DataTable.Row>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.subject}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.date}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.time}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.status}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.type}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.venue}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.teacher}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>{i.comment}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: "center"}}>
                                <Button 
                                title="Update"
                                onPress={() =>{
                                    setUpdating(true)
                                    setCurrent(index)
                                    setId(i.app_id)
                                    fetch()

                                }}
                                />
                            </DataTable.Cell>
                            </DataTable.Row>)
                            })
                        }                        
                    </DataTable>
                    </ScrollView>
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
        width: "100%"

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
    form :{
        width: "100%",
        height: "99%",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
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
        width: "100%",
        height: 35,
        borderRadius: 5,
        backgroundColor: "#0d58d1",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
    },
    formButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    formPicker: {
        height: 50,
        width: "100%",
        borderColor: "#e6e6e6",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,

    },
    scroll: {
        flexGrow: 1,
        height: 700
    },
    radio: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    }
})