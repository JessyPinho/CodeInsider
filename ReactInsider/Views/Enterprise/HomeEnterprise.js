import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, validatePathConfig } from "@react-navigation/native";
import { baseURL } from '../url';






const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Non il n'y a rien a présenter ici</Text>
  </View>
);


export default function HomeEnterprise() {

  const navigation = useNavigation();
  const [alternatings,setAlternatings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getAlternatings = async () => {
      try {
       var response = await fetch(baseURL+'api/alternatings/',
       {method:"GET",
       headers:{
           "Accept": "application/json",
           "Content-Type": "application/json"
       },
      }).then((response) => response.json())
        .then((responseJson) => {setAlternatings(responseJson.data)})
      } catch (error) {
       alert(error);
      } finally {
       setLoading(false);
      }
   }
  
   useEffect(() => {
      getAlternatings();
    }, []);    



  return (

      <View style={{ flex: 1, padding: 24 }}>
          {isLoading ? <ActivityIndicator/> : (
          <FlatList
              data={alternatings}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
              <Text>Name:{item.id},{"\n"} 
              {item.name}{"\n"}
              {item.type_post}{"\n"}
              {item.description}{"\n"}
              {"\n"}
              </Text>
              )}
          />
          )}
      </View>)

  }     
;


