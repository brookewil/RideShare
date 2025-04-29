import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../styles.js';
import MapRS from '../Map'; 

function RideStatusScreen(){

    const navigation = useNavigation();

    return (
         <View style={{ flex: 1, alignItems:   
               'center', justifyContent: 'center' }}>
           <Text>Ride Status Screen</Text>
         </View>
      );
}

export default RideStatusScreen;