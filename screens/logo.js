import React from 'react';
import {  StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from "react-native";

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
"EdgeInsetsPropType will be removed",
"AsyncStorage has been extracted",
"PointPropType will be removed"
])

const config = "10.59.102.173"
//const config="192.168.1.15"
const { io } = require("socket.io-client")//({pingTimeout: 10000, pingInterval: 30000});;
const socket = io(`http://${config}:3001`);
import { auth,userRef,msgRef } from '../firebase'
function Logo({ navigation, route }) {
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        
        userRef.get()
        .then((query) => {
        query.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let data=doc.data()
            let t=[]
         
          
            if(doc.id==user.uid)
            {
              for (let i = 0; i < data.friends.length; i++) {
              let key = Object.keys(data.friends[i])
             console.log(key);
              t[i]={
                id:key[0]!='group'?key[0]:key[1],
                name:data.friends[i][key[0]!='group'?key[0]:key[1]],
                isgroup:key[0]=='group'||key[1]=='group'?'yes':'no'
              }
            }
        
            socket.emit('addUser', user.uid, socket.id);
            navigation.replace("Friends",{arr: t, from: user.uid})
            }
           
        });
        
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
        
      }else{
        //setC("login")
        console.log("else");
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'login',
            },
          ],
        })
      }
    })

    return unsubscribe
  }, [])
 
  return (
    <View  style={styles.description}>
    <Text style={styles.description}>Loading....</Text>
    </View>
  )
  
  }


  export {Logo,socket}

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
  