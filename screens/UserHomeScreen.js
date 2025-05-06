import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, doc, uid } from 'firebase/firestore';
import app from '../firebaseConfig'; // adjust if needed
import {styles} from '../styles.js';
import { View, Text, TouchableOpacity,TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import MapRS from '../Map';
import RideStatusScreen from './RideStatusScreen.js';
import { useRoute } from '@react-navigation/native';


export default function UserHomeScreen({ navigation }) {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const createRide = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user logged in');
        return;
      }

      if (!pickupLocation || !dropoffLocation) {
        setErrorMessage('Select both pickup and dropoff locations.');
        return;
      }

      if (!dateInput || !timeInput) {
        setErrorMessage('Please enter both a date and time.');
        return;
      }

      const combinedDateTime = new Date(`${dateInput}T${timeInput}`);
      const now = new Date();
      if (isNaN(combinedDateTime.getTime()) || combinedDateTime < now) {
        setErrorMessage('Planned ride time must be in the future.');
        return;
      }

      const ride = {
        riderId: user.uid,
        riderName: user.displayName || 'Anonymous',
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation,
        status: 'requested',
        createdAt: new Date(),
        isPlanned: true,
        rideTime: combinedDateTime,
        driverId: null,
        driverName: null,
      };
      const userId = user.uid;

      try {
      
        // Step 1: Create the ride
        const rideDocRef = await addDoc(collection(db, "Rides"), ride);
      
        try {
          // Step 2: Attempt to update user document
          await updateDoc(doc(db, "Users", userId), {
            ride: rideDocRef.id,
          });
        } catch (userUpdateError) {
          console.warn('Ride created but failed to update user:', userUpdateError);
        }
      
        // Step 3: Proceed regardless
        setErrorMessage('');
        Alert.alert('Ride Requested', 'Your ride has been requested.');
        navigation.navigate('RideStatus');
      
      } catch (error) {
        console.error('Error creating ride:', error);
        Alert.alert('Error', 'Could not request ride. Please try again.');
      }
      
  }
  catch (error) {

      console.error('Error creating ride:', error);
      Alert.alert('Error', 'Could not request ride. Please try again.');
    }
  };



  return (
    <View style={styles.mapContainer}>
      <Text style={styles.headerTitle}>Welcome Back</Text>

      <View style={styles.map}>
        <MapRS
          userType="rider"
          onLocationChange={(pickup, dropoff) => {
            setPickupLocation(pickup);
            setDropoffLocation(dropoff);
          }}
        />
      </View>

      <Text style={{ marginTop: 10, marginLeft: 10 }}>Planned Ride Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-05-06"
        value={dateInput}
        onChangeText={setDateInput}
      />

      <Text style={{ marginTop: 10, marginLeft: 10 }}>Planned Ride Time (HH:mm, 24-hour):</Text>
      <TextInput
        style={styles.input}
        placeholder="13:15"
        value={timeInput}
        onChangeText={setTimeInput}
      />

      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={createRide}>
        <Text style={styles.buttonText}>Request/Plan a Ride</Text>
      </TouchableOpacity>
    </View>
  );
}
