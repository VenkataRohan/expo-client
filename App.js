import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';

import {Logo,socket} from './screens/logo'
import {Login} from './screens/loginfire';
import {Friends} from './screens/friendsSc'
import {ChatSc} from './screens/chatSc';
import { AddFriends } from './screens/addFriends';
import { Register } from './screens/register';

import { auth } from './firebase';
import { Post } from './screens/post';
import {GroupChatSc} from './screens/groupchatSc' 
import { AddGroup } from './screens/addGroup';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();



const App = () => {
  //console.log(home);
  //aaaa()
  
  return (

    <NavigationContainer >
      <Stack.Navigator initialRouteName="logo">
      
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
      name="logo"
      component={Logo}
      
    />
        <Stack.Screen
          name="Friends"
          component={Friends}
          options={{ title: 'Friends' }}
        />
        <Stack.Screen name="chatSc" component={ChatSc} options={{ title: 'chat' }} />
        <Stack.Screen name="groupchatSc" component={GroupChatSc} options={{ title: 'chat' }} />

        <Stack.Screen name="addFriends" component={AddFriends} options={{ title: 'addFriends' }} />
        <Stack.Screen name="register" component={Register} options={{ title: 'Register' }} />
        <Stack.Screen name="post" component={Post} options={{ title: 'Post' }} />
        <Stack.Screen name="addGroup" component={AddGroup} options={{ title: 'addGroup' }} />

      </Stack.Navigator>
    </NavigationContainer>
 
  );
};

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



export default App;
