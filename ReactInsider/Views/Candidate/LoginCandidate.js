import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from "react-native";
import { CheckBox } from 'react-native-elements';

const LoginCandidate = ({navigation})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [candidate, setCandidate] = useState("");
    const [entreprise, setEntreprise] = useState("");
    const selectCandidate = () => {
        setCandidate(true)
        setEntreprise(false)
    }
    const selectEntreprise = () => {
        setCandidate(false)
        setEntreprise(true)
    }
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image style={styles.image} source={require("../../assets/CodeInsider.jpg")} />
            </View>
            <View style={styles.formulaire}>
                <Text style={styles.title}>Ajouter un poste</Text>
                <TextInput style={styles.inputtext}
                    placeholder="Email"
                    onChangeText={(email) => setTitle(email)}
                >
                </TextInput>
                <TextInput style={styles.inputtext}
                    placeholder="Mot de passe"
                    onChangeText={(password) => setType_post(password)}>
                </TextInput>
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
                <TouchableOpacity style={styles.loginBtn}>
                        <Text>Connexion</Text>
                    </TouchableOpacity>
            </View>
        </View>
    );
}
export default LoginCandidate
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    logo: {
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },

    formulaire: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#043c92",
        width: "100%",
        height: "70%",
        justifyContent: "center",
        alignItems: "center",

    },
    title: {
        color: "white",
        fontSize: 30,
        marginBottom: 50,
    },
    image: {
        width: '70%',
        resizeMode: 'contain'
    },
    inputtext: {
        backgroundColor: "#ffffff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 10,
        padding: 15,
        alignItems: "center",
    },
    loginBtn: {
        width: "60%",
        borderRadius: 30,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#ffffff",
    },

})