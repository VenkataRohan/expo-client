import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';
import { socket } from './logo';
import { auth ,userRef,s} from '../firebase'

//const config = "10.59.109.11"



const Profile = ({ navigation, route }) => {
   // const {  from } = route.params
    const [search, setSearch] = React.useState('')
    const [arr,setArr]=React.useState([])
    React.useEffect(() => {
        

       
      }, [])
    
    
   
      const onchange=(text)=>{
        setSearch(text)
        let t=[]
        userRef
        .orderBy("name")
        .startAt(`${text}`)
        .endAt(`${text}\uf8ff`)
        .get()
        .then((query) => {
        query.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let data=doc.data()
            
            //console.log(data);
             t.push({id:doc.id,name:data.name})
        });
        console.log(t);
     setArr(t)   
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
      }
  
      const fun=(name,id)=>{
        navigation.replace("viewProfile",{id})
    //     let temp=[]
    //     userRef
    //     .where("__name__","==",`${id}`)
    //     //.doc(from)
    //     .get()
    //     .then((query) => {
    //     query.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         let data=doc.data()
    //         //console.log("54765677575");
    //         temp=data.friends
    //         console.log(data);
    //         //console.log("111111");
    //     });
    
       
    // })
    // .catch((error) => {
    //     console.log("Error getting documents: ", error);
    // });


       
      }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View >
        <TextInput
          placeholder="search"
          value={search}
          onChangeText={text => onchange(text)}
          style={styles.input}
        />
    <Text>{arr.length==0&&search!='' ? 'result not found' : ''}</Text>
      </View>
      <FlatList
      data={arr}
      renderItem={({ item }) =>
    <View>
        <Button onPress={()=>fun(item.name,item.id)} title={item.name} />
        </View>
      }
      keyExtractor={(item,index )=> index}

    />
      <View >
    
      </View>
    </KeyboardAvoidingView>
  )
}
export {Profile}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
  })
  