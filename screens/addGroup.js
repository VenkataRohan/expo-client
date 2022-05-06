import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';
import { socket } from './logo';
import { auth ,userRef,s,groupRef} from '../firebase'

//const config = "10.59.109.11"



const AddGroup = ({ navigation, route }) => {
    const {  ar,from } = route.params
    const [search, setSearch] = React.useState('')
    const [name, SetName] = React.useState('')

    const [arr,setArr]=React.useState([])
    const [garr,gsetArr]=React.useState([])

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
  const createGroup=()=>{
    const t=[],temp=[]
    for(let i=0;i<garr.length;i++)
      {
        temp[i]=garr[i].id
        t[i]={[garr[i].id]:garr[i].name}
      }
    groupRef.add({
      name:name,
      members:t
    }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      socket.emit("addGrp",temp,docRef.id,name)
      for(let i=0;i<garr.length;i++)
      {
        userRef.doc(garr[i].id).update({
          friends:s.arrayUnion({[docRef.id]:name,group:'yes'})
      })
      }
      ar.push({ id:docRef.id,
      name:name,
      isgroup:'yes'})
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Friends',
            params:{arr:ar,from}
          },
        ],
      })
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
       

        
  }
      const fun=(name,id)=>{
        gsetArr(prev=>[...prev,{id,name}])
        // let temp=[]
        // console.log(from);
        // userRef
        // .where("__name__","==",`${from}`)
        // //.doc(from)
        // .get()
        // .then((query) => {
        // query.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     let data=doc.data()
        //     //console.log("54765677575");
        //     temp=data.friends
            
        //     //console.log("111111");
        // });
        // temp.push({[id]:name})

        // userRef.doc(from).update({
        //     friends:temp
        // })
        // let t=[]
        // for(let i=0;i<temp.length;i++)
        // {
        //         let key = Object.keys(temp[i])
        //           //console.log(key);
        //           t[i]={
        //             id:key[0],
        //             name:temp[i][key]
        //           }
            
        // }
        // navigation.reset({
        //     index: 0,
        //     routes: [
        //       {
        //         name: 'Friends',
        //         params:{arr:t,from}
        //       },
        //     ],
        //   })
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
      

        <TextInput
          placeholder="search"
          value={search}
          onChangeText={text => onchange(text)}
          style={styles.input}
        />
    <Text>{arr.length==0&&search!='' ? 'result not found' : ''}</Text>
      
      
      <FlatList
      
      data={arr}
      renderItem={({ item }) =>
    <ScrollView>
        <Text>{item.name}</Text>
        <Button onPress={()=>fun(item.name,item.id)} title="add" />
        </ScrollView>
      }
      keyExtractor={(item,index )=> index}

    />
   
      <View >
  
    <View>
      <TextInput
      placeholder="Group Name"
      value={name}
      onChangeText={text => SetName(text)}
      style={styles.input1}
    />
      <Button onPress={()=>createGroup()} title="done" />
   
      
      </View>
      </View>
      <FlatList
  horizontal
  data={garr}
  renderItem={({ item }) =>
<ScrollView>
    <Text>{item.name}</Text>
    <Button onPress={()=>remove(item.name,item.id)} title="remove" />
    </ScrollView>
  }
  keyExtractor={(item,index )=> index}

/>  
    </KeyboardAvoidingView>
  )
}
export {AddGroup}

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
      marginTop: 10,
    },
    input1: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 10,
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
  



