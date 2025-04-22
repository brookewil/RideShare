import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../styles.js';
import MapRS from '../Map'; 

function UserHomeScreen() {

  const navigation = useNavigation();

  return (
     <View style={{ flex: 1, alignItems:   
           'center'}}>
        <View style = {{height: '55%', width: '95%', overflow: 'hidden'}}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <MapRS/>
        </View>
        <Button title="Request" onPress={() => navigation.navigate('Request')} />
     </View>
  );
}

export default UserHomeScreen;