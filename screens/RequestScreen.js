import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../styles.js';
import MapRS, { UserLocation } from '../Map';

function RequestScreen(){

  const navigation = useNavigation();

  const handleConfirm = async () => {
    const location = await UserLocation();
    if (location) {
      console.log("Confirmed Pickup Location:", location);              // store location
      navigation.navigate('RideStatus', { pickupLocation: location }); // navigate to ridestatus if correct

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