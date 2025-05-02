// ---IMPORTS---
import React, {useState, useEffect} from 'react';
import {GOOGLE_API_KEY} from '@env';

// Map Imports
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
// Location Imports
import * as Location from 'expo-location';
import { inMemoryPersistence } from 'firebase/auth'; // This import just appeared at some point, LMK if still needed

// Google Maps Places and Directions Imports
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

// Ithaca College Coords:
// 42.422668, -76.494209
// Used as Base Location if User Location is unavailable
const IC_COORDS = {
    latitude: 42.422668,
    longitude: -76.494209
}

// ---DEFS---
// Google Maps API Key
// const GOOGLE_API = GOOGLE_API_KEY;
const GOOGLE_API = GOOGLE_API_KEY;

// Map Size
const DELTA_LAT = 0.0922;
const DELTA_LNG = 0.0421;

// Map Aspects
const ROUTE_COLOR = 'red'; 
const ROUTE_WIDTH = 3; // Relatively thin, could be made thicker

// Other
const MIN_WORD_SEARCH = 2;

// ---FUNCS---

// TODO: Add driver logic; send map to driver, driver to user map
// Add input to determine whether map is for driver or rider
// RIDER MAP: As is
// DRIVER MAP: No input for destination, given user location as destination and user location to user destination

async function UserLocation() {
    // Gets User Location, called by MapRS()
    try {
        // Ask for Location Permission
        const {status} = await Location.requestForegroundPermissionsAsync();
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
    const [location, setLocation] = React.useState(null);
    const [destination, setDestination] = React.useState(null);
    const [mapLoaded, setMapLoaded] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [driverAssigned, setDriverAssigned] = React.useState(false);

    useEffect(() => {
        (async () => {
            const userLocation = await UserLocation();
            if (userLocation) {
                setLocation(userLocation);
            }
            setLoading(false); // Once finished, set loading to false
        })();
    }, []);

    if (loading) {
        // While loading user location, show simple loading screen
        return (
            <View style={styles.container}>
                <Text>Loading map...</Text>
            </View>
        );
    }

    if (!location) {
        // If couldn't get user location, show IC map
        console.log("No Location Found, using Default Location");
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

    console.log("User Location Found");
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                // Google-Powered Search for Location, used for Rider Destination
                placeholder='Search'
                minLength={MIN_WORD_SEARCH}
                fetchDetails={true}
                enablePoweredByContainer={false}
                onPress={(data, details = null) => {
                    if (details) {
                        const { lat, lng } = details.geometry.location;
                        console.log("User Searched for and chose Location:", lat, lng);
                        setDestination({
                            latitude: lat,
                            longitude: lng,
                        });
                    }
                }}
                query={{
                    key: GOOGLE_API,
                    language: 'en',
                }}
                styles={{
                    container: {
                        flex: 0,
                        position: 'absolute',
                        width: '100%',
                        zIndex: 1,
                    },
                    listView: {
                        backgroundColor: 'white',
                    },
                }}
            />
            <MapView
                // Apple Maps
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
                            // User Location
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title="Your Location"
                            description="Disclaimer: User Position may not be Exact"
                        />
                        {destination && (
                            <Marker
                                // User Destination
                                coordinate={destination}
                                title="Destination"
                                description="User Selected Destination"
                            />
                        )}
                        {destination && (
                            <MapViewDirections
                                // Draws a line between User Location and Destination
                                origin={location}
                                destination={destination}
                                apikey={GOOGLE_API}
                                strokeWidth={ROUTE_WIDTH}
                                strokeColor={ROUTE_COLOR}
                            />
                        )}
                        {/* {driverAssigned && (
                            <Marker
                                // Driver Location
                                coordinate={{
                                    latitude: 0.0,
                                    longitude: 0.0,
                                }}
                                title = "Driver Location"
                                description = 'Driver Assigned to your Ride'
                            />
                        )}
                        {driverAssigned && (
                            <MapViewDirections
                                // Draws a line between Driver Location and User Location
                                origin={location} // Change to driver location
                                destination={location} // Rider Location
                                apikey={GOOGLE_API}
                                strokeWidth={ROUTE_WIDTH}
                                strokeColor={ROUTE_COLOR}
                            />
                        )} */}
                    </>
                )}
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

console.log("Good Map Initialize");

export default MapRS;