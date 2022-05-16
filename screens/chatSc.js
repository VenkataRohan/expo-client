import React from 'react';
import { StyleSheet, Text, Image,TextInput,Platform ,Pressable, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';    
import { GiftedChat } from 'react-native-gifted-chat'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { socket } from './logo';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
//import 'expo-dev-client';
import { Video, AVPlaybackStatus,Audio } from 'expo-av';
import { auth ,msgRef,ref1} from '../firebase'
import * as WebBrowser from 'expo-web-browser';

 function ChatSc({ navigation, route })  {
  const [messages, setMessages] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [arr, setArr] = React.useState([])
  const [image, setImage] = React.useState(null);
  const [recording, setRecording] = React.useState();
  const [sound, setSound] = React.useState();
  const [time, setTime] = React.useState("11");
  const [mm, setMM] = React.useState("");


   const [fileUrl, setFileUrl] = React.useState(null);
   const { to, from } = route.params
 
  React.useEffect(() => {
    let unmounted = false

    if (!unmounted) {
      let a=[]
      msgRef
      .where("from_to","in",[`${from}_${to}`,`${to}_${from}`])
      .orderBy("createAt")
      .get()
      .then((query) => {
      query.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let data=doc.data()
        //  console.log(data);
   //   console.log(data.img);
          a.push({id:data.from,m:data.msg,img:data.img,loc:data.loc,doc:data.doc})
          
      setArr(a)
      });
      
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
  

      socket.on("aa", (msg,from,img,loc,doc) => {
        console.log("eeeeee");
        //console.log(img);

        setArr(prev=>[...prev,{m:msg,id:from,img:img,loc:loc,doc:doc}])

      });
    }
    return () => {
      socket.off("aa")
      unmounted = true
    }
  }, [])

  const urlToBlob = async (url) => {
    return await new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", url);
      xhr.responseType = "blob"; // convert type
      xhr.send();
    });
  };
  const uploadDocAsync = async (imageUri,name) => {
    let blob;
    const imageRef = imageUri.substring(imageUri.lastIndexOf("/"));
  
    try {
      blob = await urlToBlob(imageUri);
      const ref = await ref1.child(imageRef);
      await ref.put(blob);
      const link= await ref.getDownloadURL();
      console.log(link);
      msgRef.doc().set({
        from:from,
        to:to,
        from_to:`${from}_${to}`,
        doc:{link,name},
        createAt:new Date()
    })
   // console.log(result.uri);
      socket.emit('chat', undefined, to, from,undefined,undefined,{link,name});
      return link
    } catch (error) {
      console.log(
        "  error",
        error
      );
    } finally {
      blob.close();
      console.log("blob closed");
    }
  };
  const uploadImageAsync = async (imageUri) => {
    let blob;
    const imageRef = imageUri.substring(imageUri.lastIndexOf("/"));
  
    try {
      blob = await urlToBlob(imageUri);
      const ref = await ref1.child(imageRef);
      await ref.put(blob);
      const link= await ref.getDownloadURL();
      console.log(link);
      console.log("1221212121212");
      msgRef.doc().set({
        from:from,
        to:to,
        from_to:`${from}_${to}`,
        img:link,
        createAt:new Date()
    })
   // console.log(result.uri);
      socket.emit('chat', undefined, to, from,link,undefined,undefined);
      return link
    } catch (error) {
      console.log(
        " error",
        error
      );
    } finally {
      blob.close();
      console.log("blob closed");
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
    const aa= uploadImageAsync(result.uri)
   console.log(aa+"    asdasdasd");
     
    
    }
  };

 const  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    uploadDocAsync(result.uri,result.name)
   // alert(result.uri);
   // Linking.openURL(result.uri);
    console.log(result);
}

  const [m, setM] = React.useState('')
  const fun = () => {
 console.log("tttttt");
    let ms=m
    msgRef.doc().set({
      from:from,
      to:to,
      from_to:`${from}_${to}`,
      msg:ms,
      createAt:new Date()
  })
  .then((docRef) => {
      console.log("Document written with ID:kjbkjhkjh ", docRef);
      socket.emit('chat', m, to, from,undefined,undefined,undefined);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
    
    setM('')
  }
  const view=(url)=>{
    //Linking.openURL(url);
    console.log("dddd");
    WebBrowser.openBrowserAsync(url);
  }
  const call=()=>{
     navigation.navigate('videoCall', { from })
  }
  class Loc {
    constructor (latitude,longitude ) {
        this.latitude= latitude;
        this.longitude = longitude
    }
}
  const getLoc=async()=>{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
              alert('Permission to access location was denied');
              return;
            }
        Location.getCurrentPositionAsync({})
        .then((location)=>{
          const loc={
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
          
          const lat=  location.coords.latitude
            const long=  location.coords.longitude
           console.log(lat+" "+long);

          socket.emit('chat', undefined, to, from,undefined,loc,undefined);
          msgRef.doc("a123456789").set({
            from:from,
            to:to,
            from_to:`${from}_${to}`,
            loc:loc,
            createAt:new Date()
        })
        .then((docRef) => {
            console.log("Document written with ID:kjbkjhkjh ", docRef);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        }).catch((err)=>{
          console.log(err);
        })
    
  }

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    const aa= uploadImageAsync(uri)
  }

  async function playSound(uri) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      { uri:uri }
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

const onpressModel=(t,m)=>{
  console.log(modalVisible);
  setModalVisible(!modalVisible)
  msgRef.doc().set({
    from:from,
    to:to,
    from_to:`${from}_${to}`,
    msg:m,
    createAt:new Date()
})
.then((docRef) => {
    console.log("Document written with ID:kjbkjhkjh ", docRef);
   
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
  setTimeout(function () { socket.emit('chat', m, to, from,undefined,undefined)}, parseInt(t));


  
}
  const check=(item)=>{
    if(item.img)
    {
      let ind=item.img.lastIndexOf(".")
      let s=item.img.substring(ind + 1,ind+4);
      console.log(s+" dfsdfsdfsdfdfdfsdfgfhgfjgh");
      if(s=="mp4")
      {
        console.log("vvvvvvvvvv");
      return <Video
      style={{ width: 150, height: 150 }}
      source={{
        uri:item.img ,
      }}
      useNativeControls
      resizeMode="contain"
      isLooping
      
    />
    }
    else if(s=='m4a'||s=='mp3')
    {
      console.log("999");
      return <Button title="Play Sound" onPress={()=>playSound(item.img)} />
    }

      return <Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />
    }
    if(item.m)
    return <Text>{item.m}</Text>
    if(item.doc)
    return <Text style={{ color: 'red',width: 200, height: 16 }} onPress={()=>view(item.doc.link)}>{item.doc.name}</Text>
    if(item.loc)
    {
    return <MapView style={{ width: 100, height: 100 }}
    initialRegion={{
                  latitude: item.loc.latitude,
                  longitude: item.loc.longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
              }}>
              <MapView.Marker
              coordinate={{
                latitude: item.loc.latitude,
                longitude: item.loc.longitude,
              }}
             
            />
              </MapView>
            }
  }

  const onSend = React.useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  // {item.img? <Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />:<Text>{item.m}</Text>}
  return (

    <View >
    <Modal
    animationType="slide"
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}
    >
    
     <View style={styles.centeredView}>
    
      <View style={styles.modalView}>
      <TextInput
      style={{ color: 'black',backgroundColor:"grey"}} 
    onChangeText={val=>setMM(val)}
    value={mm}
    />
       <TextInput
       style={{ color: 'red',backgroundColor:"yellow"}} 
    onChangeText={val=>setTime(val)}
    value={time}
    />
        <Button
        title='Ok'
          style={[styles.button, styles.buttonClose]}
          onPress={()=>onpressModel(time,mm)}
        />
        
      </View>
      
    </View>
    </Modal>
   
      <View style={styles.textInput}>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
        <TextInput
          value={m}
          onChangeText={(val) => setM(val)} />
        <Button onPress={fun} title="send"  />
       
   
        <Button title="Pick an image" onPress={()=>pickImage()} />
        <Button title="Pick Doc" onPress={()=>pickDocument()} />
        <Button title="call" onPress={()=>call()} />
        <Button title="getLoc" onPress={()=>getLoc()} />
        <Button title="ScheduleMsg" onPress={()=>setModalVisible(true)} />

        <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />

        
      </View>

      <FlatList
        data={arr}
        renderItem={({ item }) =>
        <View>
      
       
      {check(item)}
          </View>
        }
        keyExtractor={(item,index )=> index}

      />


    </View> 


  );
};

export {ChatSc}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "blue",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
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



// {item.img &&   <Button onPress={()=>view(item.img)} title="View" />}





