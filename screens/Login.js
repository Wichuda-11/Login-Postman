import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({ navigation }) => {
    /* ฟังก์ชั่น */ 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await fetch('https://www.melivecode.com/api/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresIn: 6000
            })
        })
        const data = await response.json()
        if (data.status === 'ok') {
            Alert.alert(
                data.status,
                data.message,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
                );
            await AsyncStorage.setItem('@accessToken', data.accessToken)
            const accessToken = await AsyncStorage.getItem('@accessToken')
            navigation.navigate('Profile')
            console.log(data.accessToken)
        } else {
            Alert.alert(
                data.status,
                data.message,
                [
                    {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
                );
        }
    }


  return (
    <View style={styles.Container}>
            <View style={styles.imageContainer}>
                <Image source={require('../img/ask2.png')}
                style={{ width: 200, height:200}} />
            </View>
        
        <View style={styles.inputContainer}>
        <TextInput
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        />
        <TextInput
        label="Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        value={password}
        onChangeText={text => setPassword(text)}
        />
        </View>

        <View style={styles.buttomContainer}>
        <Button mode="contained" onPress={handleLogin} color="#696969">
            Login
        </Button>
        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        width: '100%',
        maxWidth: 340,
        alignSelf: "center",
        justifyContent: "center",
    },
    imageContainer: {
        alignSelf: "center",
        padding: 14
    },
    inputContainer: {
        padding: 14
    },
    buttomContainer: {
        alignSelf: "center",
        width: '50%'
    }
})