import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Form, Button } from 'react-native';
import React, { useState } from 'react';
import {styles} from './styles.js';

import {initMap} from './Map.js';

export default function App() {
  
  //const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // add email validation method, check isValid, and then alert "welcome"
  const validateEmail = (email) => {
    const emailRegex = "^(?!.*[._%+-]{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    return emailRegex.test(email);
  }

  const handleLogin = () => {
    if (email.validateEmail == true && email === 'email' && password === 'password') {
      alert('Welcome');
      // Call App
      App();
    } else {
      alert('Invalid Email or Password');
    }
  }

  // App call
  function App() {
    useEffect(() => {
      // Initialize Map
      initMap();
    }, []);

    return (
      <div>
        <h1>Map</h1>
        <div id = "map" style = {{width: '100%', height: '500px'}}></div>
      </div>
    )
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

        <Button title="Submit" onPress={handleLogin} />

      <StatusBar style="auto" />
    </View>
  );
}