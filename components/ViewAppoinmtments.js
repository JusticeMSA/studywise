import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';
import { Picker } from '@react-native-community/picker'
import DatePicker from '@dietime/react-native-date-picker';

import MenuBar from './MenuBar'

export default function ViewAppoinmtments({navigation}) {

    const [selectedValue, setSelectedValue] = useState("java");
    const [date, setDate] = useState();
    return (
        <View style={{width: "100%"}}>
            <MenuBar open={() =>{navigation.openDrawer()}}/>
            <Text style={styles.appointmentsHeader}>Appointments</Text>
            <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Subject</Text>
                    <View style={styles.formPicker}>
                    <Picker
                        selectedValue={selectedValue}
                        
                        onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}
                    >
                        <Picker.Item label="Subject" value="subjec" />
                        <Picker.Item label="Subject" value="subject" />
                    </Picker>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Date</Text>
                        <View style={styles.formPicker}>

                        <DatePicker
                            value={date}
                            onChange={(value) => setDate(value)}
                            format="yyyy-mm-dd"
                            height={100}
                            width={"100%"}
                        />
                        </View>
                    </View>
                    
                </View>
                <View>
                    <TouchableOpacity 
                        style={styles.formButton}
                        // onPress={() => navigation.navigate('Dashboard')}
                    >
                        <Text style={styles.formButtonText}>Filter Appointments</Text>
                    </TouchableOpacity>
                </View>
            <ScrollView style={styles.scroll} horizontal={true}>
                    <DataTable style={styles.table}>
                        <DataTable.Header style={styles.table}>
                        <DataTable.Title>Subject</DataTable.Title>
                        <DataTable.Title >Date</DataTable.Title>
                        <DataTable.Title >Time</DataTable.Title>
                        <DataTable.Title >Status</DataTable.Title>
                        <DataTable.Title >Type</DataTable.Title>
                        <DataTable.Title >Vanue</DataTable.Title>
                        <DataTable.Title >Mentor/Lecturer</DataTable.Title>
                        <DataTable.Title >Comment</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row style={styles.table}>
                        <DataTable.Cell>dfgd</DataTable.Cell>
                        <DataTable.Cell >159</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        <DataTable.Cell >6.0</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row style={styles.center}>
                        <DataTable.Cell>sdssd</DataTable.Cell>
                        <DataTable.Cell >237</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        <DataTable.Cell >8.0</DataTable.Cell>
                        </DataTable.Row>

                        
                    </DataTable>
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
        width: 500
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
        width: "80%",
        height: 35,
        borderRadius: 5,
        backgroundColor: "#0d58d1",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        marginLeft: 10,
        textAlign: "center"
    },
    formButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    formPicker: {
        height: 50,
        width: "70%",
        borderColor: "#e6e6e6",
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
