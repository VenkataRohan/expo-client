import React from 'react';
import {  StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';
import { socket } from './logo';


//const config = "10.59.109.11"
//const config="192.168.1.15"
import { auth ,userRef,s} from '../firebase'

const ViewProfile = ({ navigation, route }) => {
 
    const { id } = route.params
   const [name,setName]=React.useState()
   const [email,setEmail]=React.useState()

    React.useEffect(() => {
        userRef
            .where("__name__","==",`${id}`)
            //.doc(from)
            .get()
            .then((query) => {
            query.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let data=doc.data()
                //console.log("54765677575");
              
                setName(data.name)
                setEmail(data.email)
                console.log(data);
                //console.log("111111");
            });
        })
      return () => console.log("stopped");
    },[])
 
  
    return (
      <View>
     <Text>{name}</Text>
     <Text>{email}</Text>


      </View>
    );
  }
  
  export{ ViewProfile}

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
  