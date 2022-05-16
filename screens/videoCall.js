import { View, StyleSheet, Button ,Text} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { RCamera } from  'react-camera-media-stream'

import Peer from 'peerjs';
//kXYhGUdIGkcYlk4981W3hfWVxiu2

function VideoCall({ navigation, route })  {
    const {from}=route.params
    console.log(from);
    const peer = new Peer(from)
   // console.log(peer);
   
   console.log(from);
    if(from=="kXYhGUdIGkcYlk4981W3hfWVxiu2")
    {
        console.log("aaaa");
        var call = peer.call('xUGkWLYKa3MYWKj5QRfZJZNpkpz1','szxzc');
    console.log("12132132");
    }
    peer.on('call', function(call) {
       
        console.log("bbbbbbbbb");
      });
    return  (
    <View>
     
      <Text>sadasdasdas</Text>
      
      </View>
    
    );
      };
      
      export {VideoCall}











































// //import 'expo-dev-client';
// import React from 'react';

// import { View, StyleSheet, Button ,Text} from 'react-native';
// import { Video, AVPlaybackStatus } from 'expo-av';


// import {
//     RTCPeerConnection,
//     RTCIceCandidate,
//     RTCSessionDescription,
//     RTCView,
//     MediaStream,
//     MediaStreamTrack,
//     mediaDevices,
//     registerGlobals
//   } from 'react-native-webrtc'
// // Initialize WebRTC
// const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
// const pc = new RTCPeerConnection(configuration);


// // import Peer from 'peerjs';

// // const pc = new Peer()
// function VideoCall({ navigation, route })  {
//    const localRef = React.useRef();
// const remoteRef = React.useRef();
// const {  toid } = route.params
// const [myVideo,SetMyVideo]=React.useState()

// // myPeer.on('open', id => {
// //     socket.emit('join-room', ROOM_ID, id)
// //   })
  
// //     const myVideo = document.createElement('video')
// // myVideo.muted = true
// // const peers = {}
// console.log(mediaDevices);

// mediaDevices.getUserMedia({
//     audio: true,
//     video: {
//       width: 640,
//       height: 480,
//       frameRate: 30,
 
//     }
//   })
//   .then(stream => {
//     // Got stream!
//     localRef.current.srcObject=stream
// console.log("aaaa");
// //   myPeer.on('call', call => {
// //     call.answer(stream)
// //    // const video = document.createElement('video')
// //     call.on('stream', userVideoStream => {
// //    //   addVideoStream(video, userVideoStream)
// //     })
// //   })
// })
//   .catch(error => {
//     // Log error
//     console.log("vvvvvvv   "+error);
//   });

// //navigator.mediaDevices.getUserMedia()//.then(stream => {
// //     localRef.current.srcObject=stream

// //   myPeer.on('call', call => {
// //     call.answer(stream)
// //    // const video = document.createElement('video')
// //     call.on('stream', userVideoStream => {
// //       addVideoStream(video, userVideoStream)
// //     })
// //  })

// //   socket.on('call-user-connected', userId => {
// //     connectToNewUser(userId, stream)
// //   })
// //})

// // socket.on('user-disconnected', userId => {
// //   if (peers[userId]) peers[userId].close()
// // })


// // function connectToNewUser(userId, stream) {
// //   const call = myPeer.call(userId, stream)
// //   const video = document.createElement('video')
// //   call.on('stream', userVideoStream => {
// //     addVideoStream(video, userVideoStream)
// //   })
// //   call.on('close', () => {
// //     video.remove()
// //   })

// //   peers[userId] = call
// // }

// // function addVideoStream(video, stream) {
// //   video.srcObject = stream
// //   video.addEventListener('loadedmetadata', () => {
// //     video.play()
// //   })
// //   videoGrid.append(video)
// // }




// return  (
// <View style={styles.container}>
 
//   <Text>sadasdasdas</Text>
//   </View>

// );
//   };
  
//   export {VideoCall}
  
//   const styles = StyleSheet.create({
//     task: {
//       marginVertical: 4,
//       marginHorizontal: 8,
//       backgroundColor: 'yellow',
//       paddingHorizontal: 6,
//       paddingVertical: 15
//     },
//     container: {
//       paddingTop: 40,
//       flex: 1,
//       backgroundColor: 'white',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     description: {
//       display: "flex",
//       alignItems: "center",
//       marginVertical: 20,
//     },
//     textInput: {
//       backgroundColor: 'yellow',
//     },
//     button: {
//       alignItems: "center",
//       backgroundColor: "#DDDDDD",
//       padding: 10
//     }
//   });
  






