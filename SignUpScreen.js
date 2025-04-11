import { Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles.js';
import { auth, db } from './firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { StatusBar } from 'expo-status-bar';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^(?!.*[._%+-]{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email Format');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Create a Firestore document for the new user
      await setDoc(doc(db, "U", uid), {
        email: email,
        createdAt: new Date().toISOString(),
        role: "user", 
      });

      Alert.alert('Account created!');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up - Enter Email</Text>
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
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignUp} />
      <StatusBar style="auto" />
    </View>
  );
}
