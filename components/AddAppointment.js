import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native'
import { Picker } from '@react-native-community/picker'
import DatePicker from '@dietime/react-native-date-picker';
import { RadioButton } from 'react-native-paper';


import MenuBar from './MenuBar'

export default function AddAppointment({navigation}) {

    const [selectedSubject, setSelectedSubject] = useState("Subject");
    const [selectedLect, setSelectedLect] = useState("Name Surname");
    const [checked, setChecked] = useState("lab");
    const [selectedValue, setSelectedValue] = useState("java");
    const [date, setDate] = useState();
    return (
        <View style={styles.container}>
            <MenuBar open={() =>{navigation.openDrawer()}}/>
            <ScrollView style={styles.scroll}>

                <View style={styles.form}>
                <Text style={styles.heading}>Add Appointment</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Subject</Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.formPicker}
                        onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}
                    >
                        <Picker.Item label="Subject" value="subjec" />
                        <Picker.Item label="Subject" value="subject" />
                    </Picker>
                    
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Lecturer/Mentor</Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.formPicker}
                        onValueChange={(itemValue, itemIndex) => setSelectedLect(itemValue)}
                    >
                        <Picker.Item label="Name surname" value="Name surname" />
                        <Picker.Item label="Name surname" value="Name surname" />
                    </Picker>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Date</Text>
                    <DatePicker
                        value={date}
                        onChange={(value) => setDate(value)}
                        format="yyyy-mm-dd"
                        height={100}
                        width={"80%"}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Lecturer/Mentor</Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.formPicker}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="08:00" value="java" />
                        <Picker.Item label="09:00" value="js" />
                    </Picker>
                </View>
                <View style={styles.radio}>
                    <Text style={styles.formLabel}>Lab</Text>
                    <RadioButton
                        value="lab"
                        status={ checked === 'lab' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('lab')}
                        color="#0d58d1"
                    />
                    <Text style={styles.formLabel}>Online</Text>
                    <RadioButton
                        value="lab"
                        status={ checked === 'online' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('online')}
                        color="#0d58d1"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Comment</Text>
                    <TextInput 
                        style={styles.formComment}
                        multiline = {true}
                        numberOfLines = {8}
                    />
                </View>
                <View style={styles.radio}>
                    <TouchableOpacity 
                        style={styles.formButton}
                        // onPress={() => navigation.navigate('Dashboard')}
                    >
                        <Text style={styles.formButtonText}>Login</Text>
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
