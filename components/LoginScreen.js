import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

//Import components
import SafeContainer from './safeContainer/SafeContainer'

export default function LoginScreen() {

    const [checked, setChecked] = React.useState('student')

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.heading}>Login</Text>

                <View style={styles.formGroup, styles.radio}>
                <Text style={styles.formLabel}>Student</Text>
                <RadioButton
                    value="student"
                    status={ checked === 'student' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('student')}
                    color="#0d58d1"
                />
                <Text style={styles.formLabel}>Lecturer</Text>
                <RadioButton
                    value="lecturer"
                    status={ checked === 'lecturer' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('lecturer')}
                    color="#0d58d1"
                />
                <Text style={styles.formLabel}>Mentor</Text>
                <RadioButton
                    value="lecturer"
                    status={ checked === 'mentor' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('mentor')}
                    color="#0d58d1"
                />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Username</Text>
                    <TextInput 
                        style={styles.formInput}
                        textContentType="username"
                        placeholder="Username"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Password</Text>
                    <TextInput 
                        style={styles.formInput}
                        textContentType="password"
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.formGroup}>
                    <TouchableOpacity style={styles.formButton}>
                        <Text style={styles.formButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    form :{
        width: "90%",
        height: "90%",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
        justifyContent: "center",
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
    radio: {
        flexDirection: "row",
        alignItems: "center"
    }
})