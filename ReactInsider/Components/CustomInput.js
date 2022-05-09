//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Image, Button, TouchableOpacity } from 'react-native';
import React, {Component} from 'react';
import {useForm, Controller} from 'react-hook-form';
//import { useNavigation } from '@react-navigation/native';


const CustomInput = ({
    control,
    name,
    rules = {},
    placeholder,
    secureTextEntry,
  }) => {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <View
              style={[
                styles.container,
                {borderColor: error ? 'red' : '#e8e8e8'},
              ]}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
              />
            </View>
            {error && (
              <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
            )}
          </>
        )}
      />
    );
  };

  const styles = StyleSheet.create({
    TextInput: {
      textAlign: 'auto',
      justifyContent: 'center',
    }
  })
export default CustomInput;