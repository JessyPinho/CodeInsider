import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import { Input, Icon } from 'react-native-elements';

const defaultState = {
  title: '',
  type_post:'',
  alternation_duration:'',
  competences:'',
  description:'',

  titleError: '',
  type_postError:'',
  alternation_durationError:'',
  competencesError:'',
  descriptionError:'',
};


class RegisterPost extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
  }


  validate() {
    let titleError = "";
    let type_postError = "";
    let alternation_durationError = "";
    let competencesError = "";
    let descriptionError="";

    if (!this.state.title) {
      titleError = "Un intitulé de poste est requis";
    }
    if (!this.state.alternation_duration) {
      alternation_durationError = "La durée d'alternance est requise";
    }
    if (!this.state.type_post) {
      type_postError = "Le contrat de travail recherché est requis";
    }
    if (!this.state.description) {
      descriptionError = "Dis nous en un eu plus sur le poste";
    }
    if (!this.state.competences) {
      competencesError = "Au moins une compétence est requise";
    }
    this.setState({ titleError, alternation_durationError, type_postError, descriptionError, competencesError});
    if ( titleError || alternation_durationError || type_postError || descriptionError || competencesError) {
      return false;
    }
    return true;
  }

  submit() {
    if (this.validate()) {
      this.onFetchLoginRecords();
    }
  }
  
  async onFetchLoginRecords() {
    var entrepise_id=2;
    var data = {
      title: this.state.title,
      type_post:this.state.type_post,
      competences:this.state.competences,
      duration:this.state.alternation_duration,
      description:this.state.description,
    };
    try {
      let response = await fetch(
      "http://101e-45-149-155-124.ngrok.io/api/entreprise/"+entrepise_id+"/post",
      {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        }, 
        body: JSON.stringify(data)
      }).then((response) => response.json())
      .then((responseJson) => {
          alert(responseJson.message);
      }

    )} catch (errors) {
       alert(errors);
    }
  } 

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Ajout d'un poste à pourvoir
        </Text>
        <ScrollView>
          <View style={styles.inputContainer}>
            <Input style={styles.inputtext}
                placeholder="Intitulé de poste"
                name="title"
                onChangeText={(title)=>{this.setState({title})}}
                value={this.state.title}             
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.titleError}
            />
            <Input style={styles.inputtext}
                placeholder="Type de contrat"
                name="type_post"
                onChangeText={(type_post)=>{this.setState({type_post})}}
                value={this.state.type_post}             
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.type_postError}
            />
            <Input style={styles.inputtext}
                placeholder="Durée du poste"
                name="alternation_duration"
                onChangeText={(alternation_duration)=>{this.setState({alternation_duration})}}
                value={this.state.alternation_duration}             
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.alternation_durationError}
            />
            <Input style={styles.inputtext}
                placeholder="Compétences pour ce poste"
                name="competences"
                onChangeText={(competences)=>{this.setState({competences})}}
                value={this.state.competences}             
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.competencesError}
            />
            <Input style={styles.inputtext}
                placeholder="Description"
                name="description"
                onChangeText={(description)=>{this.setState({description})}}
                value={this.state.description}             
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.descriptionError}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => this.submit()}
            >
              <Text style={styles.saveButtonText}>Ajouter le poste</Text>
            </TouchableOpacity>                          
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default RegisterPost


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
  }
});