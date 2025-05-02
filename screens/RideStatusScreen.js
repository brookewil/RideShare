import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../styles.js';
import MapRS from '../Map'; 

function RideStatusScreen(){

    const navigation = useNavigation();
    const route = useRoute();
    const { pickupLocation } = route.params;
    
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ride Requested</Text>
      <Text>Your pickup location:</Text>
        <Text>
          Latitude: {pickupLocation.latitude}, Longitude: {pickupLocation.longitude}
        </Text>
    </View>
  );
}

export default RideStatusScreen;