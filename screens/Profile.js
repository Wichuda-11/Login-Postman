import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        const accessToken = await AsyncStorage.getItem('@accessToken')
            const response = await fetch('https://www.melivecode.com/api/auth/user', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },    
        })
        const data = await response.json()
        console.log(data)
        if (data.status === 'forbidden') {
            navigation.navigate('Login')
        }
        setUser(data.user)
        setIsLoading(false)
    }

    useEffect(() => { 
        fetchUser()
    }, [isLoading])


  return (
    <View style={ styles.Container }>
      { isLoading ?
      <Text>Loading</Text> :
        <View >
            <Image source={{ uri: user.avatar}}
                style={{ width: 150, height:150}} />
            <Text>{user.fname} {user.lname}</Text>
            <Text>{user.email}</Text>
            <Button
            onPress={fetchUser}
            title="Reload"
            color="#696969"
            />
        </View>
        }
    </View>
  )
}
  

export default Profile

const styles = StyleSheet.create({
        Container:{
        flex: 1,
        width: '100%',
        maxWidth: 340,
        alignSelf: "center",
        justifyContent: "center"
        }
}
)