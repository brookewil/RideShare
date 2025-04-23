import * as React from 'react';
import { View, Text } from 'react-native';
import {styles} from '../styles.js';
import MapRS from '../Map'; 

function UserHomeScreen() {
  return (
     <View style={{ flex: 1, alignItems:   
           'center'}}>
        <View style = {{height: '55%', width: '95%', overflow: 'hidden'}}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <MapRS/>
        </View>
     </View>
  );
}

export default UserHomeScreen;