import React from 'react';
import {  StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket } from './logo';
import { auth } from '../firebase'

const config = "192.168.1.15"
// const { io } = require("socket.io-client");
// const socket = io(`http://${config}:3001`);


const Login = ({ navigation, route }) => {
  console.log("uuuuuu");
 
 
  const [m, setM] = React.useState('')
  const getFriends = async (user) => {
    const unmounted = false
    if (!unmounted) {
      fetch(`http://${config}:3001/friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user
        })

      })
        .then((response) => response.json())
        .then(async (json) => {
          if (json.length == 0) {
            //console.warn("user not found");
            alert("usernot found")
            return
          }
          const t = []
          console.log(json);
          for (let i = 0; i < json.data[0].friends.length; i++) {
            let key = Object.keys(json.data[0].friends[i])
            t[i] = {
              id: key[0],
              name: json.data[0].friends[i][key[0]]
            }
          }
          if (t.length != 0) {
            await AsyncStorage.setItem("token", json.token)
            const tt = await AsyncStorage.getItem("token")
            console.log(tt + '  sdfdasda');
            await navigation.navigate('Friends', { arr: t, from: user })
          }


        })
        .catch((err) => {
        })
    }

  }



  const fun = () => {
    getFriends(m)
    socket.emit('addUser', m, socket.id);
    setM("");
  }
  return (
    <View>
      <View style={styles.textInput}>
        <TextInput
          value={m}
          onChangeText={(val) => setM(val)} />
        <Button
          title="Send"
          onPress={fun}
        />
      </View>


    </View>
  );
};

  
export {Login}

const styles = StyleSheet.create({
  task: {
    marginVertical: 4,
    marginHorizontal: 8,
    backgroundColor: 'yellow',
    paddingHorizontal: 6,
    paddingVertical: 15
  },
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    display: "flex",
    alignItems: "center",
    marginVertical: 20,
  },
  textInput: {
    backgroundColor: 'yellow',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
