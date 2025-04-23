import React, {useState, useEffect} from 'react';

// Map Imports
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';

// Location Imports
import * as Location from 'expo-location';
import { inMemoryPersistence } from 'firebase/auth';

// Google Maps Places and Directions Imports
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

// Ithaca College Coords:
// 42.422668, -76.494209

// Google Maps API Key
const GOOGLE_API = 'AIzaSyAgN1zPM_MvXhxdRDdTg-Zm4oHO9gSpZ6g';

// Map Size
const DELTA_LAT = 0.0922;
const DELTA_LNG = 0.0421;

// Map Aspects
const ROUTE_COLOR = 'red'; 
const ROUTE_WIDTH = 3; // Relatively thin, could be made thicker

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
    const [destination, setDestination] = React.useState(null);
    const [mapLoaded, setMapLoaded] = React.useState(false);

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
                        latitudeDelta: DELTA_LAT,
                        longitudeDelta: DELTA_LNG,
                    }}
                >
                </MapView>
            </View>
        );
    }

    return (
        // If Location is provided, show map centered on User Location
        <View style = {styles.container}>
            <GooglePlacesAutocomplete
                // Google Places API for User to search for and select Destination
                placeholder = 'Search' // What appears in the search bar when inactive
                minLength={2} // Minimum number of characters to init search
                fetchDetails = {true} // Fetches details of the selected Destination
                enablePoweredByContainer = {false} // Hides "Powered by Google" text
                onPress = {(data, details = null) => {
                    if (details) {
                        const {lat, lng} = details.geometry.location;
                        console.log("User Searched for and choose Location: ", lat, lng);
                        setDestination ({
                            latitude: lat,
                            longitude: lng,
                        });
                        // console.log(data, details);
                    }
                }}
                query = {{
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
                // provider = "google"
                style = {styles.map}
                // Shows user location area
                initialRegion = {{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: DELTA_LAT,
                    longitudeDelta: DELTA_LNG,
                }}
                // Only set mapLoaded to true when onMapReady
                onMapReady = {() => setMapLoaded(true)}
            >
                {mapLoaded && (
                    <>
                        <Marker
                            // Marker object is User Location "exact"
                            coordinate = {{
                                latitude: location.latitude, 
                                longitude: location.longitude,
                            }}
                            title = "Your Location"
                            description = "Disclaimer: User Position may not be Exact"
                        />
                        {destination && (
                            <Marker
                                // Marker object for Destination
                                coordinate = {destination} // This holds both lat, lng
                                title = "Destination"
                                description = "User Selected Destination"
                            />
                        )}
                        {destination && (
                            <MapViewDirections
                                origin = {location}
                                destination = {destination}
                                apikey = {GOOGLE_API}
                                strokeWidth = {ROUTE_WIDTH}
                                strokeColor = {ROUTE_COLOR}
                            />
                        )}
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

export default MapRS;