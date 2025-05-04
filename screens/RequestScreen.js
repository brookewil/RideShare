import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../styles.js';
import MapRS, { UserLocation } from '../Map';
import { db } from '../firebase'; // Adjust path if needed
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function RequestScreen(){

  const navigation = useNavigation();

  const handleConfirm = async () => {
    const location = await UserLocation();
  
    if (location) {
      console.log("Confirmed Pickup Location:", location);
  
      try {
        const rideRef = await addDoc(collection(db, "rides"), {
          pickupLocation: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          status: "requested",
          createdAt: serverTimestamp(),
          // You can also add: riderId: currentUser.uid if you use Firebase Auth
        });
  
        console.log("Ride created with ID:", rideRef.id);
  
        navigation.navigate('RideStatus', {
          pickupLocation: location,
          rideId: rideRef.id, // Pass this to status screen if needed
        });
  
      } catch (error) {
        console.error("Error adding ride to Firestore:", error);
      }
  
    } else {
      console.error("No location found");
    }
  };
  

    return (
      <View style={styles.mapContainer}>
        <Text style={styles.headerTitle}>Request a Ride</Text>
          <View style = {styles.map}>
            <MapRS/>
          </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleConfirm()}>
            <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
          
      </View>
      );
}

export default RequestScreen;