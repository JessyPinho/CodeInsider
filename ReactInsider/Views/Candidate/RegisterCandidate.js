import React, { Component } from 'react';
import { ScrollView, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, validatePathConfig } from "@react-navigation/native";
import { baseURL } from '../url';


const defaultState = {
  name: '',
  lastname:'',
  email: '',
  password: '',
  rePassword:'',
  localization:'',
  description:'',
  minimum_wage:'',
  maximum_wage:'',
  type_post:'',
  year_of_study:'',
  alternation_duration:'',
  competences:'',

  nameError: '',
  lastnameError:'',
  emailError: '',
  passwordError: '',
  rePasswordError:'',
  localizationError:'',
  descriptionError:'',
  minimum_wageError:'',
  maximum_wageError:'',
  type_postError:'',
  year_of_studyError:'',
  alternation_durationError:'',
  competencesError:'',
};



class RegisterCandidate extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
  }


  validate() {
    let nameError = "";
    let lastnameError = "";
    let emailError = "";
    let passwordError = "";
    let rePasswordError="";
    let localizationError="";
    let descriptionError="";
    let minimum_wageError="";
    let maximum_wageError="";
    let year_of_studyError="";
    let type_postError="";
    let alternation_durationError="";
    let competencesError="";
    if (!this.state.name.trim()) {
      nameError = "Ton prénom est requis";
    }
    if (!this.state.lastname.trim()) {
      lastnameError = "Ton nom est requis";
    }
    if (!this.state.localization.trim()) {
      localizationError = "Ta ville de résidence est requise";
    }
    if (!this.state.description.trim()) {
      descriptionError = "Dis nous en un eu plus sur toi";
    }
    if (!this.state.minimum_wage.trim()) {
      minimum_wageError = "Le minimum de salaire que tu exiges est requis";
    }
    if (!this.state.maximum_wage.trim()) {
      maximum_wageError = "Le maximum de salaire que tu souhaiterais est requis";
    }
    if (parseInt(this.state.maximum_wage.trim()) && parseInt(this.state.minimum_wage.trim())){
      if ( parseInt(this.state.maximum_wage.trim()) < parseInt(this.state.minimum_wage.trim()) ) {
        maximum_wageError = "Demande un salaire plus élevé que ton salaire minimum ;)";
      }
    }
    if (!this.state.year_of_study.trim()) {
      year_of_studyError = "Ton niveau d'études actuel est requis";
    }
    if (!this.state.alternation_duration.trim()) {
      alternation_durationError = "Ta durée d'alternance est requise";
    }

    if (!this.state.competences.trim()) {
      competencesError = "Au moins une compétence est requise";
    }
    if (!this.state.type_post.trim()) {
      type_postError = "le contrat de travail recherché est requis";
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email.trim() || reg.test(this.state.email.trim()) === false) {
      emailError = "Ton mail est requis au format exemple@mail.com";
    }
    if (!this.state.password.trim()) {
      passwordError = "Un mot de passe est requis";
    }
    if (!this.state.rePassword.trim()) {
      rePasswordError = "Une confirmation du mot de passe est requise";
    }
    else if ( this.state.rePassword.trim() != this.state.password.trim()){
      rePasswordError = "Les mots de passe ne correspondent pas. Veuillez réessayer";
    }
    this.setState({ nameError, emailError, passwordError, rePasswordError, lastnameError, localizationError, descriptionError, minimum_wageError, maximum_wageError, competencesError, alternation_durationError, year_of_studyError, type_postError });
    if (nameError || emailError || passwordError || rePasswordError || lastnameError || localizationError || descriptionError || minimum_wageError || maximum_wageError || competencesError || alternation_durationError || year_of_studyError || type_postError) {
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
    var data = {
      name: this.state.name.trim(),
      lastname:this.state.lastname.trim(),
      email: this.state.email.trim(),
      password: this.state.password.trim(),
      localization:this.state.localization.trim(),
      description:this.state.description.trim(),
      minimum_wage:this.state.minimum_wage.trim(),
      maximum_wage:this.state.maximum_wage.trim(),
      type_post:this.state.type_post.trim(),
      year_of_study:this.state.year_of_study.trim(),
      alternation_duration:this.state.alternation_duration.trim(),
      competences:this.state.competences.trim(),
    };
    try {
      let response = await fetch(
      baseURL+"api/alternating",
      {
        method: "POST",
        headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          this.props.navigation.navigate('HomeC')
        }
        else if (response.status == 400){
          alert("L'email est déjà utilisé pour un autre compte, entre un autre email");
        }
        else if (response.status == 500){
          alert("Nous avons une erreur de serveur, relance l'application");
        }
        else if (response.status == 404){
          alert("erreur 404");
        }
      })
    } catch (errors) {
      alert(errors);
    } 
  }

  render() {
    return (
        <View style={styles.container}>
          
          <Text style={styles.header}>
            Inscription alternant
          </Text>
          <ScrollView>
            <View style={styles.inputContainer}>
              <Input
                style={styles.textInput}
                placeholder="Prénom"
                autoComplete="name"
                name="name"
                onChangeText={(name)=>{this.setState({name})}}
                value={this.state.name}             
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.nameError}
              />
              <Input
                style={styles.textInput}
                placeholder="Nom"
                autoComplete="lastname"
                name="lastname"
                onChangeText={(lastname)=>{this.setState({lastname})}}
                value={this.state.lastname}             
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.lastnameError}
              />
              <Input
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                autoComplete="email" 
                keyboardType="email-address"
                name="email"
                value={this.state.email}
                onChangeText={(email)=>{this.setState({email})}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.emailError}
              />  
              <Input
                style={styles.textInput}
                placeholder="Mot de passe"
                autoComplete="password-new"
                secureTextEntry={true}
                name="password"
                value={this.state.password}
                onChangeText={(password)=>{this.setState({password})}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.passwordError}
              />  
              <Input
                style={styles.textInput}
                placeholder="Confirmation du mot de passe"
                autoComplete="password-new"
                secureTextEntry={true}
                name="rePassword"
                value={this.state.rePassword}
                onChangeText={(rePassword)=>{this.setState({rePassword})}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.rePasswordError}
              />  
              <Input
                style={styles.textInput}
                placeholder="Ville"
                name="localization"
                onChangeText={(localization)=>{this.setState({localization})}}
                value={this.state.localization}             
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.localizationError}
              />
              <Input
                style={styles.textInput}
                multiline={true}
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChangeText={(description)=>{this.setState({description})}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.descriptionError}
              />
              <Input
                style={styles.textInput}
                keyboardType="number-pad"
                placeholder="salaire minimum"
                name="minimum_wage"
                value={this.state.minimum_wage}
                onChangeText={(minimum_wage)=>{this.setState({minimum_wage})}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.minimum_wageError}
              />  
              <Input
                style={styles.textInput}
                keyboardType="number-pad"
                placeholder="salaire maximum"
                name="maximum_wage"
                value={this.state.maximum_wage}
                onChangeText={(maximum_wage)=>{this.setState({maximum_wage})}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.maximum_wageError}
              />  
              <Input
                style={styles.textInput}
                placeholder="niveau d'etudes"
                name="year_of_study"
                value={this.state.year_of_study}
                onChangeText={(year_of_study)=>{this.setState({year_of_study})}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.year_of_studyError}
              />  
              <Input
                style={styles.textInput}
                placeholder="durée de l'alternance"
                name="alternation_duration"
                value={this.state.alternation_duration}
                onChangeText={(alternation_duration)=>{this.setState({alternation_duration})}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.alternation_durationError}
              />   
              <Input
                style={styles.textInput}
                placeholder="competences"
                name="competences"
                value={this.state.competences}
                onChangeText={(competences)=>{this.setState({competences})}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.competencesError}
              /> 
              <Input
                style={styles.textInput}
                placeholder="type de contrat"
                name="type_post"
                value={this.state.type_post}
                onChangeText={(type_post)=>{this.setState({type_post})}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.type_postError}
              /> 

              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => this.submit()}
              >
                <Text style={styles.saveButtonText}>S'inscrire</Text>
              </TouchableOpacity>                          
            </View>
            </ScrollView>
        </View>
    );
  }
}

export default RegisterCandidate;

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