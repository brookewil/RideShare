import * as React from 'react';
import { View, Text } from 'react-native';
import MapRS from '../Map'; 

function UserHomeScreen() {
  return (
     <View style={{ flex: 1, alignItems:   
           'center', justifyContent: 'center' }}>
        <Text>User Home Screen</Text>
        <View style = {{height: '80%', width: '95%', overflow: 'hidden'}}>
          <Text>Map</Text>
          <MapRS />
        </View>
     </View>
  );
}

export default UserHomeScreen;