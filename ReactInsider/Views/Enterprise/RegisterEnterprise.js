import React, { Component } from 'react';
import { ScrollView, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useNavigation, validatePathConfig } from "@react-navigation/native";
import { Input, CheckBox } from 'react-native-elements';
import { baseURL } from '../url';

const defaultState = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    localization: '',
    description: '',
    number_employee: '',

    nameError: '',
    emailError: '',
    passwordError: '',
    rePasswordError: '',
    localizationError: '',
    descriptionError: '',
    number_employeeError: '',
};


class FormValidationComponent extends React.Component {
    constructor() {
        super();
        this.state = defaultState;
    }


    validate() {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let rePasswordError = "";
        let localizationError = "";
        let descriptionError = "";
        let number_employeeError = "";
        if (!this.state.name.trim()) {
            nameError = "Ton prénom est requis";
        }
        
        if (!this.state.localization.trim()) {
            localizationError = "Ta ville de résidence est requise";
        }
        if (!this.state.description.trim()) {
            descriptionError = "Dis nous en un eu plus sur toi";
        }


        if (!this.state.number_employee.trim()) {
            number_employeeError = "Le nombre d'employé est requise";
        }
        const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!this.state.email.trim() || reg.test(this.state.email.trim()) === false) {
            emailError = "Ton mail est requis au format exemple@mail.com";
        }
        if (!this.state.password.trim()) {
            passwordError = "Un mot de passe est requis";
        }
        if (!this.state.rePassword.trim()) {
            rePasswordError = "Une confirmation du mot de passe est requise";
        }
        else if (this.state.rePassword.trim() != this.state.password.trim()) {
            rePasswordError = "Les mots de passe ne correspondent pas. Veuillez réessayer";
        }
        this.setState({ nameError, emailError, passwordError, rePasswordError, localizationError, descriptionError, number_employeeError });
        if (nameError || emailError || passwordError || rePasswordError || localizationError || descriptionError || number_employeeError) {
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
            email: this.state.email.trim(),
            password: this.state.password.trim(),
            localization: this.state.localization.trim(),
            description: this.state.description.trim(),
            number_employee: this.state.number_employee.trim(),
        };
        try {
            let response = await fetch(
                baseURL+"api/entreprise",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            if (response.status >= 200 && response.status < 300) {
                this.props.navigation.navigate('HomeE')

            }
            else if ( response.status ==404){
                alert("erreur 404")
            }
            else if (response.status == 400) {
                alert("L'email est déjà utilisé pour un autre compte, entre un autre email");
            }
            else if (response.status == 500) {
                alert("Nous avons une erreur de serveur, relance l'application");
            }
            else{alert(response.status)}
        } catch (errors) {
            alert(errors);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.header}>
                    Inscription entreprise
                </Text>
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.textInput}
                            placeholder="Prénom"
                            autoComplete="name"
                            name="name"
                            onChangeText={(name) => { this.setState({ name }) }}
                            value={this.state.name}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.nameError}
                        />
                        <Input
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Email"
                            autoComplete="email"
                            keyboardType="email-address"
                            name="email"
                            value={this.state.email}
                            onChangeText={(email) => { this.setState({ email }) }}
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
                            onChangeText={(password) => { this.setState({ password }) }}
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
                            onChangeText={(rePassword) => { this.setState({ rePassword }) }}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.rePasswordError}
                        />
                        <Input
                            style={styles.textInput}
                            placeholder="Ville"
                            name="localization"
                            onChangeText={(localization) => { this.setState({ localization }) }}
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
                            onChangeText={(description) => { this.setState({ description }) }}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.descriptionError}
                        />
                        <Input
                            style={styles.textInput}
                            multiline={true}
                            keyboardType="number-pad"
                            placeholder="Nombre d'employés"
                            name="number_employee"
                            value={this.state.number_employee}
                            onChangeText={(number_employee) => { this.setState({ number_employee }) }}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.number_employeeError}
                        />
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => this.submit()}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default FormValidationComponent;

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