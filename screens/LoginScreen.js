
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Form, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {styles} from '../styles.js';
import { auth } from '../firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import { useEffect } from 'react';
import { Image } from 'react-native';

import SignUpScreen from '../SignUpScreen.js'; // Import the SignUpScreen component

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

import {initMap} from '../Map.js';

export default function LoginScreen() {
  
  //const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showSignup, setShowSignup] = useState(false); // to toggle view
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);


  // add email validation method, check isValid, and then alert "welcome"
  const validateEmail = (email) => {
    const emailRegex = /^(?!.*[._%+-]{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Please enter your email to reset your password.');
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password reset email sent!', 'Check your inbox.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email Format');
      return;
    }
    
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;

    // First check Admins collection
    const adminRef = doc(db, 'Admins', uid);
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists()) {
      Alert.alert('Welcome Admin!');
      navigation.navigate('HomeTab', { screen: 'AdminHome' });
      return;
    }

    // Then check users collection
    const userRef = doc(db, 'Users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();

      if (userData.type === 'driver') {
        Alert.alert('Welcome Driver!');
        navigation.navigate('HomeTab', { screen: 'DriverHome' });
      } else {
        Alert.alert('Welcome User!');
        navigation.navigate('HomeTab', { screen: 'UserHome' });
      }
    } else {
      Alert.alert('Login Failed', error.message);
    }

  } catch (error) {
    Alert.alert('Login Failed', error.message);
  }
};
 
useEffect(() => {
  if (showSignup) {
    navigation.navigate('SignUp');
  }
}, [showSignup]);
  return (
    <View style={styles.loginContainer}>
      <Image source={require('../assets/logo.png')} style={{ width: 200, height: 100, alignSelf: 'center', marginTop: 30, marginBottom: 30 }}  />

      <Text style={styles.title}>Enter Email</Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          placeholder="Email"
        />

      <Text style={styles.title}>Enter Password</Text>
        <TextInput 
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          placeholder="Password"
          secureTextEntry={!showPassword}

        />

        <TouchableOpacity
                style={{fontSize: 12}}
                onPress={() => {setShowPassword(!showPassword)}}>
                <Text style={{color: 'blue'}}>{showPassword ? "Hide Password" : "Show Password"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
                style={{fontSize: 12}}
                onPress={() => {handleResetPassword()}}>
                <Text style={{color: 'blue'}}>Forgot Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
                style={styles.button}
                onPress={() => handleLogin()}>
                <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
                style={styles.button}
                onPress={() => setShowSignup(true)}>
                <Text style={styles.buttonText}>Create Acccount</Text>
        </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
