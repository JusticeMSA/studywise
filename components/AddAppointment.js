import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Picker} from 'react-native'
import { RadioButton } from 'react-native-paper'
import DatePicker from 'react-native-datepicker';
import {Picker as Pick} from '@react-native-community/picker';
import {firebase} from '../firebaseConfig'
import {Context} from '../context'


import MenuBar from './MenuBar'

export default function AddAppointment({navigation}) {

    //context
    const [context, setContext] = useContext(Context);

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

    const now = new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-')
    const[subs, setSubs] = useState([])

    useEffect(() => {

        async function get(){
            const usersRef = await firebase.firestore().collection('users').doc(`${context.user_id}`).get()
            const snapshot = await usersRef.data()
            setSubs(snapshot.subjects)
        }
        get()
    }, [])

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

        const id = Math.floor(Math.random() * 100000000000)
        
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
              app_id: id,
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
            const res =  await firebase.firestore().collection('appointments').doc(`${id}`).set(data);
            alert('Appointment request sent'),
            navigation.navigate('Dashboard')
          }catch(e){
              alert('Something went wrong!!')
          }

         
    }

    return (
        <View style={styles.container}>
            <MenuBar open={() =>{navigation.openDrawer()}}/>
            <ScrollView style={styles.scroll}>

                <View style={styles.form}>
                <Text style={styles.heading}>Add Appointment</Text>

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

            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
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
