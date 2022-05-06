import React from 'react';
import { StyleSheet, Text, Image,TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';    
import { socket } from './logo';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';
//import 'expo-dev-client';
import { auth ,msgRef,ref1} from '../firebase'

//import VideoComponent from './videoCall';
 function ChatSc({ navigation, route })  {
  const [arr, setArr] = React.useState([])
  const [image, setImage] = React.useState(null);
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
   //   console.log(data.img);
          a.push({id:data.from,m:data.msg,img:data.img})
          
      setArr(a)
      });
      
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
  

      socket.on("aa", (msg,from,img) => {
        console.log("eeeeee");
        //console.log(img);
        setArr(prev=>[...prev,{m:msg,id:from,img:img}])

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
  const uploadImageAsync = async (imageUri) => {
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
        img:link,
        createAt:new Date()
    })
   // console.log(result.uri);
      socket.emit('chat', undefined, to, from,link);
      return link
    } catch (error) {
      console.log(
        "🚀 ~ file: eventServices.jsx ~ line 33 ~ createEvent ~ error",
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
    uploadImageAsync(result.uri)
    alert(result.uri);
    Linking.openURL(this.props.href);
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
      socket.emit('chat', m, to, from,undefined);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
    
    setM('')
  }
  const view=(url)=>{
    Linking.openURL(url);
  }
  return (

    <View>
      <View style={styles.textInput}>
        <TextInput
          value={m}
          onChangeText={(val) => setM(val)} />
        <Button onPress={fun} title="send" />
       
   
        <Button title="Pick an image" onPress={()=>pickImage()} />
        <Button title="Pick Doc" onPress={()=>pickDocument()} />
        
      </View>

      <FlatList
        data={arr}
        renderItem={({ item }) =>
        <View>
        {item.img? <Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />:<Text>{item.m}</Text>}
       
      
          </View>
        }
        keyExtractor={(item,index )=> index}

      />


    </View> 


  );
};

export {ChatSc}

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



// {item.img &&   <Button onPress={()=>view(item.img)} title="View" />}