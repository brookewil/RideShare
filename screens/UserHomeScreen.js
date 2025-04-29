import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles.js';
import MapRS from '../Map';

// The original home content with the map and buttons
function UserHomeScreen() {

  const navigation = useNavigation();

  return (
     <View style={styles.mapContainer}>

        <Text style={styles.headerTitle}>Welcome Back</Text>
        <View style = {styles.map}>
          <MapRS/>
        </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Request')}>
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

export default UserHomeScreen;
