import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from "react-native";

const PostEnterprise = () => {
    const [title, setTitle] = useState("");
    const [type_post, setType_post] = useState("");
    const [duration, setDuration] = useState("");
    const [competences, setCompetences] = useState("");
    const [description, setDescription] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image style={styles.image} source={require("../../assets/CodeInsider.jpg")} />
            </View>
            <View style={styles.formulaire}>
                <Text style={styles.title}>Ajouter un poste</Text>
                <TextInput style={styles.inputtext}
                    placeholder="Titre du Poste"
                    onChangeText={(title) => setTitle(title)}
                >
                </TextInput>
                <TextInput style={styles.inputtext}
                    placeholder="Type de Poste"
                    onChangeText={(type_post) => setType_post(type_post)}
                >
                </TextInput>
                <TextInput style={styles.inputtext}
                    placeholder="Durée du poste"
                    onChangeText={(duration) => setDuration(duration)}
                >

                </TextInput>
                <TextInput style={styles.inputtext}
                    placeholder="Compétences pour ce poste">
                </TextInput>
                <TextInput style={styles.inputtext}
                    placeholder="Description">
                </TextInput>
                <TouchableOpacity style={styles.postBtn}>
                    <Text>Créer le Poste</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default PostEnterprise

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
    postBtn: {
        width: "60%",
        borderRadius: 30,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#ffffff",
    },

})
