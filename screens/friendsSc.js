import React from 'react';
import {  StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';
import { socket } from './logo';


//const config = "10.59.109.11"
//const config="192.168.1.15"
import { auth } from '../firebase'

const Friends = ({ navigation, route }) => {
  const [ar,setAr]=React.useState([])
    const { arr, from } = route.params
    
    // console.log(arr);
    //console.log(from);
    console.log("123456");
    const handleSignOut = () => {
      auth
        .signOut()
        .then(() => {
          
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'login',
                },
              ],
            })
        })
        .catch(error => alert(error.message))
    }
    React.useEffect(() => {
      setAr(arr)
      socket.on('addG',(id,name)=>{
        setAr(prevv=>[...prevv,{id,name,isgroup:'yes'}])
      })
      return () => console.log("stopped");
    },[])
    const getMsg = (f, t) => {
  
      navigation.navigate('chatSc', { to: t, from: f })
  
    }
    const update=(parr,ind)=>{
      const a=parr.splice(ind,1)
  
       parr.unshift(a[0])
      
    }
  
    const onPress = (num,ind,isgroup) => {
      if(isgroup=='no')
      getMsg(from, num)
      else
      navigation.navigate('groupchatSc', { to: num, from:from })
 
 update(ar,ind)

  setAr(parr=>[...parr])
    }
    const viewpost=()=>{
      navigation.navigate('post',{from: from })
    } 
    const addFriends=()=>{
      navigation.navigate('addFriends',{from: from })
    }
    const creategroup=()=>{
      navigation.navigate('addGroup',{ar:ar,from: from })
      
    }
    return (
      <View>
        <Button
          title="LogOut"
          onPress={handleSignOut}
        />
        <Button
          title="Add Friends"
          onPress={addFriends}
        />
        <Button
          title="Posts"
          onPress={viewpost}
        />
        <Button
        title="create group"
        onPress={creategroup}
      />
        <FlatList
          data={ar}
          renderItem={({ item ,index}) =>
  
            <TouchableOpacity
              style={styles.button}
              onPress={() => onPress(item.id,index,item.isgroup)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          }
          keyExtractor={(item => item.id)}
  
        />
      </View>
    );
  }
  
  export{ Friends}

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
  