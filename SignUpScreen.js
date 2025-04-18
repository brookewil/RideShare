import { Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles.js';
import { StatusBar } from 'expo-status-bar';
import { RadioButton } from 'react-native-paper';  // Import RadioButton component
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

import Rider from './Rider';
import Driver from './Driver';
import Car from './Car';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('rider');  // Default role set to 'rider'

  // Car fields
  const [carYear, setCarYear] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carPlate, setCarPlate] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^(?!.*[._%+-]{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email Format');
      return;
    }
  
    if (!birthday || !phoneNumber) {
      Alert.alert('Please fill out birthday and phone number');
      return;
    }
  
    if (role === 'driver' && (!carYear || !carMake || !carModel || !carColor || !carPlate)) {
      Alert.alert('Drivers must enter all car details');
      return;
    }
  
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
  
      let userObject;
      if (role === 'rider') {
        userObject = new Rider(email, password, birthday, phoneNumber);
      } else if (role === 'driver') {
        userObject = new Driver(email, password, birthday, phoneNumber, null); // we'll attach car separately
      }
  
      userObject.signup(); // optional logging
  
      // Save user first without car
      await setDoc(doc(db, "Users", uid), {
        ...userObject,
        cars: [], // init as empty list of car IDs
        createdAt: new Date().toISOString(),
      });
  
      // If driver, create car in Cars collection and link it
      if (role === 'driver') {
        const carData = {
          year: carYear,
          make: carMake,
          model: carModel,
          color: carColor,
          plate: carPlate,
          ownerUid: uid,
          createdAt: new Date().toISOString(),
        };
  
        // Add car to Cars collection
        const carDocRef = await addDoc(collection(db, "Cars"), carData);
  
        // Update user with reference to car
        await updateDoc(doc(db, "Users", uid), {
          cars: arrayUnion(carDocRef.id),
        });
      }
  
      Alert.alert('Account created successfully!');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };
  
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <TextInput style={styles.input} value={birthday} onChangeText={setBirthday} placeholder="Birthday (YYYY-MM-DD)" />
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />

      {/* Role Selection using Radio Buttons */}
      <Text style={styles.title}>Select Role</Text>
      <View>
        <View style={styles.radioButtonContainer}>
          <Text>Rider</Text>
          <RadioButton
            value="rider"
            status={role === 'rider' ? 'checked' : 'unchecked'}
            onPress={() => setRole('rider')}
          />
        </View>
        <View style={styles.radioButtonContainer}>
          <Text>Driver</Text>
          <RadioButton
            value="driver"
            status={role === 'driver' ? 'checked' : 'unchecked'}
            onPress={() => setRole('driver')}
          />
        </View>
      </View>

      {/* Car Information for Driver Role */}
      {role === 'driver' && (
        <>
          <Text style={styles.title}>Car Information</Text>
          <TextInput style={styles.input} value={carYear} onChangeText={setCarYear} placeholder="Year" />
          <TextInput style={styles.input} value={carMake} onChangeText={setCarMake} placeholder="Make" />
          <TextInput style={styles.input} value={carModel} onChangeText={setCarModel} placeholder="Model" />
          <TextInput style={styles.input} value={carColor} onChangeText={setCarColor} placeholder="Color" />
          <TextInput style={styles.input} value={carPlate} onChangeText={setCarPlate} placeholder="Plate Number" />
        </>
      )}

      <Button title="Sign Up" onPress={handleSignUp} />
      <StatusBar style="auto" />
    </ScrollView>
  );
}
