import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,

} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, validatePathConfig } from "@react-navigation/native";
import { baseURL } from '../url';
//import { white } from 'react-native-paper/lib/typescript/styles/colors';




const ITEM_MARGIN_BOTTOM=20;
const ITEM_PADDING= 10;
const HEIGHT_IMG= 100;
const ITEM_SIZE= HEIGHT_IMG +ITEM_PADDING*2 +ITEM_MARGIN_BOTTOM;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Non il n'y a rien a présenter ici</Text>
  </View>
);


export default function HomeCandidate() {
const navigation = useNavigation();
const [posts,setPost] = useState([]);
const [isLoading, setLoading] = useState(true);
const scrollY= React.useRef(new Animated.Value(0)).current;

const getPost = async () => {
      try {
       var response = await fetch(baseURL+'api/posts/',
       {method:"GET",
       headers:{
           "Accept": "application/json",
           "Content-Type": "application/json"
       },
      }).then((response) => response.json())
        .then((responseJson) => {setPost(responseJson.data)})
      } catch (error) {
       alert(error);
      } finally {
       setLoading(false);
      }
   }
  
   useEffect(() => {
      getPost();
    }, []); 
    
    renderItem = ({item,index})=> {
      const scale = scrollY.interpolate({
        inputRange:[
          -1,0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2)
        ],
        outputRange:[1,1,1,0]
      })

        const opacity = scrollY.interpolate({
          inputRange:[
            -1,0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index +2 )
          ],
          outputRange:[1,1,1,0]
      })
      return (
        <Animated.View style= {[
          styles.item,
          {
              // transform:[{scale}],
              // opacity
          }
        ]}
        >
          <Image
            style= {styles.image}
            source= {{uri: "https://media-exp1.licdn.com/dms/image/C560BAQGZZaJM1gJuTw/company-logo_200_200/0/1607358004419?e=2147483647&v=beta&t=2KT-XzU1V6YPZBr0QYxSv0Ym1Eh3em6XmsjvoNYOTVI"}}
            resizeMode='contain'>
          </Image>
          <View style={styles.wrapText}>
            <Text style={styles.fontSize}>
              {index +'. '+item.title}
            </Text>
            <Text>
            {"Poste: \n"}{item.type_post}
            </Text>
            <Text>
            {"Description: \n"}{item.description}
            </Text>
            <Text>
            {"Durée du contrat: \n"}{item.duration}
            </Text>
            <Text>
            {"Compétences requises: \n"}{item.competences}
            </Text>
          </View>

        </Animated.View>
      )
    }

  return (

      <SafeAreaView style={styles.container}>
          {isLoading ? <ActivityIndicator/> : (
          <Animated.FlatList
              data={posts}
              keyExtractor={({ id }, index) => id}
              renderItem={ renderItem } 
              contentContainerStyle={{
                padding:20
              }}
              onScroll={Animated.event(
                [{nativeEvent:{contentOffset: {y:scrollY}}}],
                {useNativeDriver:true}
              )}
          />
          )}
      </SafeAreaView>)

  }     
;


const styles= StyleSheet.create({
  container: {
    flex: 1
  },
  fontSize:{
    fontSize:20
  },

  image:{
    width:100,
    height:HEIGHT_IMG
  },


  wrapText:{
    flex:1,
    marginLeft:5,
    justifyContent:'center'
  },

  item:{
    flexDirection:'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor:'white',
    shadowColor:'grey',
    shadowOffset:{
      width:0,
      height:10
    },
    shadowOpacity: .5,
    shadowRadius:25,
    padding:5

  },

})
