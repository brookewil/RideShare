import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../styles.js';
import MapRS from '../Map'; 

function RequestScreen(){

  const navigation = useNavigation();

  const handleConfirm = () => {
    // grab location
    // text saying " is [location] correct?"
      // hit confirm if true
      // user drop pin again if incorrect
  }

    return (
      <View style={styles.mapContainer}>
        <Text style={styles.headerTitle}>Request a Ride</Text>
          <View style = {styles.map}>
            <MapRS/>
          </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RideStatus')}>
            <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
          
      </View>
      );
}

export default RequestScreen;