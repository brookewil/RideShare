import * as React from 'react';
import { View, Text } from 'react-native';
import {styles} from '../styles.js';

// TODO: Add map for driver, when Rider request ride, show that ride on map with "Accept/Deny" buttons
// When no rides, show text "No rides available"
// When ride accepted, send driver information to user map

function DriverHomeScreen() {
  return (
    //  <View style={{ flex: 1, alignItems:   
    //        'center', justifyContent: 'center' }}>
    //    <Text>Driver Home Screen</Text>
    //  </View>
    <View style = {styles.mapContainer}>
      <Text>Driver Home Screen</Text>
      <View style = {styles.map}>
         <MapRS mode = "rider"/>
      </View>
    </View>
  );
}

export default DriverHomeScreen;