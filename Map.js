import React, {useState, useEffect} from 'react';

// Map Imports
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';

// Location Imports
import * as Location from 'expo-location';

// Ithaca College Coords:
// 42.422668, -76.494209

async function UserLocation() {
    // Gets User Location, called by MapRS()
    try {
        // Ask for Location Permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            // Permission is Denied
            console.error('Location Permission was denied');
            return;
        }

        // Uses and logs Location function to get User Location
        const location = await Location.getCurrentPositionAsync({});
        console.log('User Location:', location.coords.latitude, location.coords.longitude);

        return location.coords;
    } catch (error) {
        // If Error, with log
        console.error('Could not retrieve user location:', error.message);
    }
}

function MapRS() {
    // Initialize and create Map Object, Called outside Map.js
    // Used for User Location
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
        // If no Location, Uses map centered on Ithaca College, Ithaca NY
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
        // If Location is provided, show map centered on User Location
        <View style={styles.container}>
            <MapView
                style={styles.map}
                // Shows user location area, Marker object is User Location "exact"
                initialRegion={{
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