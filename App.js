import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Form } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
        <Text>Enter Username:</Text>
        <TextInput 
          style={styles.login}
          id="username" 
          value={username.value} 
          onChangeText={(text) => setUsername(text)} 
          placeholder="Username" 
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  login: {
    height: 40, 
    borderColor: 'gray', 
    padding: 4,
    borderWidth: 1 }
  }
);
