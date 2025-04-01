import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Form, Button } from 'react-native';
import React, { useState } from 'react';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%' 
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10
    }
  }
)
