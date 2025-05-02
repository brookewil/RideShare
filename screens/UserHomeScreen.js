import React from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../firebaseConfig'; // adjust if needed
import {styles} from '../styles.js';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapRS from '../Map';

export default function UserHomeScreen({ navigation }) {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const createRide = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user logged in');
        return;
      }

      // TEMPORARY TEST COORDINATES:
      const tempPickupCoords = {
        latitude: 42.422668, // TODO: Replace with actual pickup latitude from Map
        longitude: -76.494209, // TODO: Replace with actual pickup longitude from Map
      };

      const tempDropoffCoords = {
        latitude: 42.4492, // TODO: Replace with actual dropoff latitude from Map
        longitude: -76.4844, // TODO: Replace with actual dropoff longitude from Map
      };

      const ride = {
        riderId: user.uid,
        riderName: user.displayName || 'Anonymous',
        pickupLocation: tempPickupCoords,
        dropoffLocation: tempDropoffCoords,
        status: 'requested',
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'Rides'), ride);
      console.log('Ride created with ID: ', docRef.id);
    } catch (error) {
      console.error('Error creating ride:', error);
    }
  };


  return (
    <View style={styles.mapContainer}>

       <Text style={styles.headerTitle}>Welcome Back</Text>
       <View style = {styles.map}>
         <MapRS/>
       </View>

     <TouchableOpacity
       style={styles.button}
       onPress={createRide}>
       <Text style={styles.buttonText}>Request</Text>
     </TouchableOpacity>

     <TouchableOpacity
       style={styles.button}
       onPress={() => navigation.navigate('PlanRide')}>
       <Text style={styles.buttonText}>Plan a Ride</Text>
     </TouchableOpacity>
   </View>
 );
}


