// //import 'expo-dev-client';
// import React, {useState} from 'react';
// import AgoraUIKit, {PropsInterface} from 'agora-rn-uikit';

// const VideoComponent= () => {
//   const [videoCall, setVideoCall] = useState(true);
//   const props= PropsInterface = {
//     rtcProps: {
//       appId: '5fa1b7587c474fc3a4ae411086f1e413',
//       channel: 'test',
//     },
//     callbacks: {
//       EndCall: () => setVideoCall(false),
//     },
//   };

//   return videoCall ? (
//     <AgoraUIKit rtcProps={props.rtcProps} callbacks={props.callbacks} />
//   ) : null;
// };

// export default VideoComponent;