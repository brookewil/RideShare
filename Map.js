import React, { useState, useEffect } from 'react';
import { GOOGLE_API_KEY } from '@env';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native';


const IC_COORDS = {
  latitude: 42.422668,
  longitude: -76.494209,
};

const DELTA_LAT = 0.0922;
const DELTA_LNG = 0.0421;
const ROUTE_COLOR = 'red';
const ROUTE_WIDTH = 3;
const MIN_WORD_SEARCH = 2;

async function UserLocation() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location Permission was denied');
      return null;
    }
    const location = await Location.getCurrentPositionAsync({});
    console.log('✅ User Location:', location.coords);
    return location.coords;
  } catch (error) {
    console.error('❌ Could not retrieve user location:', error.message);
    return null;
  }
}

function MapRS({userType, destination: inputDestination, onLocationChange}) {
  try {
    return <MapRSInner
     userType = {userType}
     inputDestination = {inputDestination}
     onLocationChange = {onLocationChange}
    />;
  } catch (err) {
    console.error('💥 Error rendering MapRS:', err.message);
    console.error(err.stack);
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: 'red' }}>Something went wrong: {err.message}</Text>
      </View>
    );
  }
}

function MapRSInner({ userType, inputDestination, onLocationChange }) {
    const [location, setLocation] = useState(null);
    const [pickup, setPickup] = useState(null);
    const [destination, setDestination] = useState(null);
    const [tempPickup, setTempPickup] = useState(null);
    const [tempDestination, setTempDestination] = useState(null);
    const [startConfirmed, setStartConfirmed] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
  
    const GOOGLE_API = GOOGLE_API_KEY;
  
    useEffect(() => {
      (async () => {
        const userLocation = await UserLocation();
        if (userLocation) {
          setLocation(userLocation);
        }
        setLoading(false);
      })();
    }, [userType]);
  
    const handleMapPress = (event) => {
      if (confirmed) return;
  
      const coord = event.nativeEvent.coordinate;
  
      if (!startConfirmed) {
        setTempPickup(coord);
      } else if (!tempDestination) {
        setTempDestination(coord);
      } else {
        setTempDestination(coord); // allow re-selecting destination before confirm
      }
    };
  
    const confirmStart = () => {
      setPickup(tempPickup);
      setTempPickup(null);
      setStartConfirmed(true);
    };
  
    const confirmDestination = () => {
      setDestination(tempDestination);
      setTempDestination(null);
      setConfirmed(true);
      if (onLocationChange) {
        onLocationChange(pickup, tempDestination);
      }
    };
  
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Loading map...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          onMapReady={() => setMapLoaded(true)}
          onPress={handleMapPress}
          initialRegion={{
            latitude: location?.latitude || IC_COORDS.latitude,
            longitude: location?.longitude || IC_COORDS.longitude,
            latitudeDelta: DELTA_LAT,
            longitudeDelta: DELTA_LNG,
          }}
        >
          {/* Confirmed Pickup and Dropoff */}
          {pickup && (
            <Marker
              coordinate={pickup}
              title="Pickup Location"
              pinColor="green"
            />
          )}
          {destination && (
            <Marker
              coordinate={destination}
              title="Dropoff Location"
              pinColor="red"
            />
          )}
  
          {/* Temporary Markers */}
          {tempPickup && !startConfirmed && (
            <Marker
              coordinate={tempPickup}
              title="Temp Pickup"
              pinColor="blue"
            />
          )}
          {tempDestination && startConfirmed && !confirmed && (
            <Marker
              coordinate={tempDestination}
              title="Temp Dropoff"
              pinColor="orange"
            />
          )}
  
          {/* Confirmed Route */}
          {pickup && destination && confirmed && (
            <MapViewDirections
              origin={pickup}
              destination={destination}
              apikey={GOOGLE_API}
              strokeWidth={ROUTE_WIDTH}
              strokeColor={ROUTE_COLOR}
            />
          )}
        </MapView>
  
        {/* Top-Left Instructions */}
        <View style={{ position: 'absolute', top: 10, left: 10 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
            {confirmed
              ? "✅ Locations chosen"
              : startConfirmed
              ? "📍 Choose destination"
              : "📍 Choose starting location"}
          </Text>
        </View>
  
        {/* Confirm Start Button */}
        {tempPickup && !startConfirmed && (
          <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <TouchableOpacity
              onPress={confirmStart}
              style={{
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 8,
                borderColor: '#ccc',
                borderWidth: 1,
              }}
            >
              <Text style={{ color: 'white' }}>Confirm Start</Text>
            </TouchableOpacity>
          </View>
        )}
  
        {/* Confirm Destination Button */}
        {startConfirmed && tempDestination && !confirmed && (
          <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <TouchableOpacity
              onPress={confirmDestination}
              style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 8,
                borderColor: '#ccc',
                borderWidth: 1,
              }}
            >
              <Text style={{ color: 'white' }}>Confirm Destination</Text>
            </TouchableOpacity>
          </View>
        )}
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
