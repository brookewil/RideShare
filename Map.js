import React, { useState, useEffect } from 'react';
import { GOOGLE_API_KEY } from '@env';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';


const IC_COORDS = {
  latitude: 42.422668,
  longitude: -76.494209,
};

const DELTA_LAT = 0.0922;
const DELTA_LNG = 0.0421;
const ROUTE_COLOR = 'red';
const ROUTE_WIDTH = 3;
const MIN_WORD_SEARCH = 2;


function MapRS(props) {
    try {
      return <MapRSInner {...props} />;
    } catch (err) {
      console.error('💥 Error rendering MapRS:', err.message);
      return (
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'red' }}>Something went wrong: {err.message}</Text>
        </View>
      );
    }
  }

  function MapRSInner({ pickupLocation, dropoffLocation, setPickupLocation, setDropoffLocation }) {
    const [tapCount, setTapCount] = useState(0);
  
    const handleMapPress = (e) => {
      const { latitude, longitude } = e.nativeEvent.coordinate;
      const coord = { latitude, longitude };
      console.log(`🟢 Tap ${tapCount + 1}:`, coord);
  
      if (tapCount === 0) {
        setPickupLocation(coord);
        setTapCount(1);
      } else if (tapCount === 1) {
        setDropoffLocation(coord);
        setTapCount(2);
      } else {
        console.log('🔁 Resetting tap flow...');
        setPickupLocation(null);
        setDropoffLocation(null);
        setTapCount(0);
      }
    };
  
    const isValidCoord = (loc) =>
      loc && typeof loc.latitude === 'number' && typeof loc.longitude === 'number';
  
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: IC_COORDS.latitude,
            longitude: IC_COORDS.longitude,
            latitudeDelta: DELTA_LAT,
            longitudeDelta: DELTA_LNG,
          }}
          onPress={handleMapPress}
        >
          {isValidCoord(pickupLocation) && (
            <Marker coordinate={pickupLocation} title="Pickup" pinColor="green" />
          )}
          {isValidCoord(dropoffLocation) && (
            <Marker coordinate={dropoffLocation} title="Dropoff" pinColor="red" />
          )}
  
          {/* ✅ Safely render route */}
          {pickupLocation && dropoffLocation ? (
  isValidCoord(pickupLocation) && isValidCoord(dropoffLocation) ? (
    <MapViewDirections
      key={`${pickupLocation.latitude},${pickupLocation.longitude}-${dropoffLocation.latitude},${dropoffLocation.longitude}`} // helps force re-render
      origin={pickupLocation}
      destination={dropoffLocation}
      apikey={GOOGLE_API_KEY}
      strokeWidth={ROUTE_WIDTH}
      strokeColor={ROUTE_COLOR}
      onError={(err) => console.error('❌ MapViewDirections error:', err)}
    />
  ) : null
) : null}
        </MapView>
      </View>
    );
  }
  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapRS;
