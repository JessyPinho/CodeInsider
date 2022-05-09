import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, } from "react-native";
import { useNavigation, validatePathConfig } from "@react-navigation/native";
import { Input, CheckBox } from 'react-native-elements';
import { baseURL } from "./url";

const LoginView = () => {
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [choiceCampError, setChoiceCampError] = useState("");
    const [candidate, setCandidate] = useState("");
    const [entreprise, setEntreprise] = useState("");
    const navigation = useNavigation();

    const selectCandidate = () => {
        setCandidate(true)
        setEntreprise(false)
    }
    const selectEntreprise = () => {
        setCandidate(false)
        setEntreprise(true)
    }



    function validate(type){
        let errors=false;
        if (type=="login"){
            const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!email.trim() || reg.test(email.trim()) === false){
                errors=true
                setEmailError("Ton mail est requis au format exemple@mail.com")
            } else {
                setEmailError('')
            }
    
            if (!password.trim()){
                errors=true
                setPasswordError("Ton mot de passe est requis pour la connexion")
            } else {
                setPasswordError('')
            }
        } else {
            setPasswordError('')
            setEmailError('')
        }
        if (!candidate && !entreprise){
            errors=true
            setChoiceCampError('Etes vous un alternant ou une entreprise ?')
        } else {
            setChoiceCampError('')
        }
        return !errors
    }

    async function submitLogin(){
        let url ="";
        if (candidate==true){
            url=baseURL+"api/alternating/login"
        } else {
            url=baseURL+"api/entreprise/login"
        }
        var data = {
            email: email.trim(),
            password: password.trim(),
          };
        try {
            let response = await fetch(
            url,
            {
              method: "POST",
              headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
              }, 
              body: JSON.stringify(data)
            }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 200){
                    console.log(responseJson.data.id)
                    setId(responseJson.data.id)
                    if (candidate){
                        navigation.navigate('HomeC')
                    }else {
                        navigation.navigate('HomeE')
                    }
                } else {
                    alert(responseJson.message);
                }
            }
          )} catch (errors) {
             alert(errors);
          }
    }

    function onLoginPressed() {
        if (validate("login")){
            submitLogin()                
        }
    }

    function onRegisterPressed() {
        if (validate("register")){
            if (candidate){
                navigation.navigate('signUpC')
            } else {
                navigation.navigate('signUpE')
            }
        }
    }

    return (
        <View style={styles.container}>
          <Text style={styles.header}>
            Connexion
          </Text>
          <ScrollView>
            <View style={styles.inputContainer}>
                <Input style={styles.inputtext}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Email"
                    name="email"
                    onChangeText={(email)=>{setEmail(email)}}
                    value={email}             
                    errorStyle={{ color: 'red' }}
                    errorMessage={emailError}
                />
                <Input style={styles.inputtext}
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                    name="password"
                    onChangeText={(password)=>{setPassword(password)}}
                    value={password}             
                    errorStyle={{ color: 'red' }}
                    errorMessage={passwordError}
                />
                <View style={styles.RadioButton}>
                    <CheckBox
                        title="Alternant"
                        center
                        checked={candidate}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon={"circle-o"}
                        onPress={selectCandidate}
                    />
                    <CheckBox
                        title="Entreprise"
                        center
                        checked={entreprise}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon={"circle-o"}
                        onPress={selectEntreprise}
                    />

                </View>
                <Text style={styles.choiceCampError}>{choiceCampError}</Text>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText} onPress={onLoginPressed}>Connexion</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText} onPress={onRegisterPressed}>Vous n'avez pas de compte ? Inscrivez vous</Text>
                </TouchableOpacity>                    
            </View>
          </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#F5FCFF',
    },
    header: {
      fontSize: 25,
      textAlign: 'center',
      margin: 10,
      fontWeight: 'bold'
    },
    inputContainer: {
      paddingTop: 15
    },
    textInput: {
        borderColor: '#CCCCCC',
        height: 55,
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10
    },
    saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 5
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    },
    inputtext: {
        backgroundColor: "#ffffff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        alignItems: "center",
    },
    choiceCampError:{
        paddingLeft:20,
        color:"red"
    }
});

export default LoginView
