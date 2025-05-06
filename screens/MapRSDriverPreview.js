// MapRSDriverPreview.js
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View } from 'react-native';
import { GOOGLE_API_KEY } from '@env';

const MapRSDriverPreview = ({ pickup, dropoff }) => {
  if (!pickup || !dropoff) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MapView style={styles.map} />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: pickup.latitude,
        longitude: pickup.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker coordinate={pickup} title="Pickup" pinColor="green" />
      <Marker coordinate={dropoff} title="Dropoff" pinColor="red" />
      <MapViewDirections
        origin={pickup}
        destination={dropoff}
        apikey={GOOGLE_API_KEY}
        strokeWidth={3}
        strokeColor="red"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapRSDriverPreview;
