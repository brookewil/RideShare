import React, { useState, useEffect } from 'react';
import { GOOGLE_API_KEY } from '@env';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import LocationSearch from './LocationSearch';


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

function MapRSInner({userType, inputDestination, onLocationChange}) {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(inputDestination);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [driverAssigned, setDriverAssigned] = useState(false);

  const GOOGLE_API = GOOGLE_API_KEY;

  if (!GOOGLE_API) {
    console.error('🚨 GOOGLE_API_KEY is undefined! Check your .env setup.');
  }

  useEffect(() => {
    (async () => {
      const userLocation = await UserLocation();
      if (userLocation) {
        setLocation(userLocation);
        if (onLocationChange) {
            onLocationChange(userLocation, destination);
        }
      }
      setLoading(false);
    })();
  }, [userType]);

  // Update destination when it is inputted
  useEffect(() => {
    if (inputDestination) {
        setDestination(inputDestination);
    }
  }, [inputDestination]);

  // Update parent call when location/destination changes
  useEffect(() => {
    if (onLocationChange) {
        onLocationChange(location, destination);
    }
  }, [location, destination]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  if (!location) {
    console.warn('⚠️ No user location found. Falling back to IC coords.');
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
        />
      </View>
    );
  }

  try {
    return (
      <View style={styles.container}>
        {location && userType === "rider" && (
            <LocationSearch onSelect={setDestination} />
        )}

        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: DELTA_LAT,
            longitudeDelta: DELTA_LNG,
          }}
          onMapReady={() => setMapLoaded(true)}
        >
          {mapLoaded && (
            <>
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Your Location"
                description="Disclaimer: May not be exact"
              />

              {destination && (
                <>
                  <Marker
                    coordinate={destination}
                    title="Destination"
                    description="Your intended destination"
                  />
                  <MapViewDirections
                    origin={location}
                    destination={destination}
                    apikey={GOOGLE_API}
                    strokeWidth={ROUTE_WIDTH}
                    strokeColor={ROUTE_COLOR}
                  />
                </>
              )}

              {/* You can uncomment and complete driver logic when needed */}
              {/* {driverAssigned && (
                <Marker
                  coordinate={{
                    latitude: 0.0,
                    longitude: 0.0,
                  }}
                  title="Driver Location"
                  description="Driver Assigned"
                />
              )} */}
            </>
          )}
        </MapView>
      </View>
    );
  } catch (e) {
    console.error('💥 Error inside JSX block of MapRSInner:', e.message);
    return <Text>Error rendering map: {e.message}</Text>;
  }
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
