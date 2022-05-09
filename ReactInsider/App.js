import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import 'react-native-gesture-handler';
// import React,{useState} from 'react';
import RegisterCandidate from './Views/Candidate/RegisterCandidate';
import HomeCandidate from './Views/Candidate/HomeCandidate';
import HomeEnterprise from './Views/Enterprise/HomeEnterprise';
import RegisterEnterprise from './Views/Enterprise/RegisterEnterprise'
import LoginView from './Views/LoginView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const App: ()=>Node = () =>{
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const RegisterStack = () => {
    return (
      <Candidate.Navigator>
        <Candidate.Screen name="RegisterEnterprise" component={RegisterEnterprise}/>
        <Candidate.Screen name="RegisterCandidate" component={RegisterCandidate}/>
  
      </Candidate.Navigator>
    )
  }

    // if (isSignedInCandidate==true){
    //   return(
    //     <NavigationContainer>
    //       <Tab.Navigator>
    //         <Tab.Screen name="Acceuil" component={HomeCandidate} />
    //         <Tab.Screen name="Notifications" component={NotificationsCandidate}/>
    //         <Tab.Screen name="Profil" component={ProfileCandidate}/>
    //       </Tab.Navigator>
    //    </NavigationContainer>
    //   )
    // }else if(isSignedInEnterprise==true){
    //   return(
    //     <NavigationContainer>
    //       <Tab.Navigator>
    //         <Tab.Screen name="Acceuil" component={HomeEnterprise} />
    //         <Tab.Screen name="Notifications" component={NotificationsEnterprise}/>
    //         <Tab.Screen name="Profil" component={ProfileEnterprise}/>
    //         <Tab.Screen name="Post" component={PostEnterprise}/>
    //       </Tab.Navigator>
    //    </NavigationContainer>

    //   )
    // }
    // else{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="signIn" component={LoginView} options={{headerShown:false}}/>
        <Stack.Screen name="signUpE" component={RegisterEnterprise} options={{headerShown:false}}/>
        <Stack.Screen name="signUpC" component={RegisterCandidate} options={{headerShown:false}}/>
        <Stack.Screen name="HomeC" component={HomeCandidate} options={{headerShown:false}}/>
        <Stack.Screen name="HomeE" component={HomeEnterprise} options={{headerShown:false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
    )
  }

  



export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },

  TopView: {
    backgroundColor:'orange',
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%' ,
    height: '40%' ,

  },

  BottomView:{
    borderTopStartRadius:60 , 
    backgroundColor:'red',
    width:'90%',
    height:'40%',
  },
});
