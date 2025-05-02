// ---IMPORTS---
import React, {useState, useEffect} from 'react';
// import {GOOGLE_API_KEY} from '@env';

// Map Imports
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';

// Location Imports
import * as Location from 'expo-location';
import { inMemoryPersistence } from 'firebase/auth'; // This import just appeared at some point, LMK if still needed

// ---DEFS---

// ---FUNCS---

async function PickupDriver() {
    // When Driver Location is "close" to User pick up Location, show "User Picked Up Button"
    // AWAIT for the Rider being picked up to also press the same button
    // AFTER Set UserPickedUp to true, show the destination marker and route
    // TODO: Implement

    // PC:
    // if (userLocation - driverLocation < .1) {
    //     show button pickupUser
    // }
    // await userGotInCar();
    // setUserPickedUp(true);
}

async function PickupRider() {
    // Same as Driver, but for Riders
}