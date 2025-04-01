import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Form, Button } from 'react-native';
import React, { useState } from 'react';
import {styles} from './styles.js';

export default function App() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'username' && password === 'password') {
      alert('Welcome');
    } else {
      alert('Incorrect Username or Password');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Username</Text>
        <TextInput 
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />

      <Text style={styles.title}>Enter Password</Text>
        <TextInput 
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />

        <Button title="Submit" onPress={handleLogin} />

      <StatusBar style="auto" />
    </View>
  );
}