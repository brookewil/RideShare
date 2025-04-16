import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Form, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {styles} from '../styles.js';
import { auth } from '../firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native'; 
import SignUpScreen from '../SignUpScreen.js'; // Import the SignUpScreen component

import {initMap} from '../Map.js';

export default function LoginScreen() {
  
  //const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showSignup, setShowSignup] = useState(false); // to toggle view
  const navigation = useNavigation();

  // add email validation method, check isValid, and then alert "welcome"
  const validateEmail = (email) => {
    const emailRegex = /^(?!.*[._%+-]{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email Format');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Welcome');
      navigation.navigate('UserHome');

    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };
 
  if (showSignup) {
    return (
      <View style={styles.container}>
        <SignUpScreen />
        <Button title="Back to Login" onPress={() => setShowSignup(false)} />
      </View>
    );
  }
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Enter Email</Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

      <Text style={styles.title}>Enter Password</Text>
        <TextInput 
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />

        <Button title="Submit" onPress={handleLogin}/>
        <Button title="Create Account" onPress={() => setShowSignup(true)} />

      <StatusBar style="auto" />
    </View>
  );
}