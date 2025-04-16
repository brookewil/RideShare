import React from 'react';
//import {Map} from 'react-native-maps';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';

let map;

function MapRS() {
    // Initialize and create Map Object
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 42.4439,
                    longitude: -76.5019,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{latitude: 42.4439, longitude: -76.5019}}
                    title="RideShare"
                    description="This is Ithaca, NY"
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