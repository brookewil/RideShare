//import React from 'react';
import React, {useState, useEffect} from 'react';

// Map Imports
//import {Map} from 'react-native-maps';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';

// Location Imports
//import Geolocation from '@react-native-community/geolocation';
import * as Location from 'expo-location';

// Ithaca College Coords:
// 42.422668, -76.494209

async function UserLocation() {
    // Get User Location
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Location Permission was denied');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        console.log('User Location:', location.coords.latitude, location.coords.longitude);

        return location.coords;
    } catch (error) {
        console.error('Could not retrieve user location:', error.message);
    }
}

function MapRS() {
    // Initialize and create Map Object
    const [location, setLocation] = React.useState(null);
    useEffect(() => {
        (async () => {
            const userLocation = await UserLocation();
            if (userLocation) {
                setLocation(userLocation);
            }
        })();
    }, []);

    if (!location){
        return (
            <View style = {styles.container}>
                <MapView
                    style = {styles.map}
                    initialRegion = {{
                        latitude: 42.4226,
                        longitude: -76.4942,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                </MapView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                // Shows user location
                initialRegion={{
                    // TODO: Take lat, long from User Location
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.latitude, 
                        longitude: location.longitude,
                    }}
                    title="Your Location"
                    description="Disclaimer: User Position may not be Exact"
                />
            </MapView>
        </View>
    );
}

// Map Style Sheet
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