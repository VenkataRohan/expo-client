import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
 import * as Location from 'expo-location';
export default function GetLocation({ navigation, route }) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
                    latitude: 17.5695729,
                    longitude: 78.4374025,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}>
                <MapView.Marker
                coordinate={{
                  latitude: 17.5695729,
                    longitude: 78.4374025,
                }}
               
              />
                </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';
// import * as Location from 'expo-location';
// import MapView from 'react-native-maps';
// export default function GetLocation() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//     console.log(text);
//   }

//   return (
//     <View style={styles.container}>
//     <MapView style={styles.map} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: 20,
//     },
//     paragraph: {
//       fontSize: 18,
//       textAlign: 'center',
//     },
//   });

// //   <Text style={styles.paragraph}>{text}</Text>