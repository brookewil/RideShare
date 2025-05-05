

import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../firebaseConfig'; // adjust if needed
import {styles} from '../styles.js';
import { View, Text, TouchableOpacity,TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapRS from '../Map';


export default function UserHomeScreen({ navigation }) {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const createRide = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user logged in');
        return;
      }
      if (!dateInput && timeInput) {
        setErrorMessage('Please enter a date for the planned ride');
        return;
      }else if (dateInput && !timeInput) {
        setErrorMessage('Please enter a time for the planned ride');
        return;
      }

      // TEMPORARY TEST COORDINATES:
      const tempPickupCoords = {
        latitude: 42.422668,
        longitude: -76.494209,
      };

      const tempDropoffCoords = {
        latitude: 42.4492,
        longitude: -76.4844,
      };

      const isPlannedRide = dateInput !== '' && timeInput !== '';

      let rideTime = null;
      const combinedDateTime = new Date(`${dateInput}T${timeInput}`);

      if (isPlannedRide) {
        if (isNaN(combinedDateTime.getTime())) {
          setErrorMessage('Invalid date or time');
          return;
        }
        rideTime = combinedDateTime;
      }
      const todaytime = new Date();
      if (combinedDateTime < todaytime) {
        setErrorMessage('Planned ride time must be in the future');
        return;
      }
      


      const ride = {
        riderId: user.uid,
        riderName: user.displayName || 'Anonymous',
        pickupLocation: userLocation || tempPickupCoords,
        dropoffLocation: destination || tempDropoffCoords,
        status: 'requested',
        createdAt: new Date(),
        isPlanned: isPlannedRide,
        rideTime: rideTime,
        driverId: null, // ID of the driver assigned to the ride
        driverName: null, // Name of the driver assigned to the ride
      };

      const docRef = await addDoc(collection(db, 'Rides'), ride);
      console.log('Ride created with ID: ', docRef.id);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating ride:', error);
    }
  };


  return (
    <View style={styles.mapContainer}>
      <Text style={styles.headerTitle}>Welcome Back</Text>

      <View style={styles.map}>
        <MapRS 
        userType={"rider"}
        onLocationChange={(location, destination) => {
          setUserLocation(location);
          setDestination(destination);
        }}
        />
      </View>

      <Text style={{ marginTop: 10, marginLeft: 10 }}>Planned Ride Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-05-02"
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

