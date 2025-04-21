import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Form, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {styles} from '../styles.js';
import { auth } from '../firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native'; 
import SignUpScreen from '../SignUpScreen.js'; // Import the SignUpScreen component
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';
const db = getFirestore(); // initialize Firestore

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

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email Format');
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check if user is an admin first
      const adminDocRef = doc(db, 'Admins', user.uid);
      const adminDocSnap = await getDoc(adminDocRef);
  
      if (adminDocSnap.exists()) {
        Alert.alert('Welcome Admin');
        navigation.navigate('AdminHome');
        return;
      }
  
      // If not admin, check Users collection
      const userDocRef = doc(db, 'Users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userType = userData.type;
  
        if (userType === 'rider') {
          Alert.alert('Welcome Rider');
          navigation.navigate('UserHome');
        } else if (userType === 'driver') {
          Alert.alert('Welcome Driver');
          navigation.navigate('DriverHome');
        } else {
          Alert.alert('Unknown user type');
        }
      } else {
        Alert.alert('User document not found');
      }
  
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
        <Button title={showPassword ? "Hide Password" : "Show Password"} onPress={() => setShowPassword(!showPassword)} />

        <Button title="Submit" onPress={handleLogin}/>
        <Button title="Create Account" onPress={() => setShowSignup(true)} />

      <StatusBar style="auto" />
    </View>
  );
}