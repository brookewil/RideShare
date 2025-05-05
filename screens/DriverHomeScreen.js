import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, onSnapshot, getDocs } from 'firebase/firestore';
import app from '../firebaseConfig';
import { styles } from '../styles.js';
import MapRS from '../Map';

// TODO: Add map for driver, when Rider request ride, show that ride on map with "Accept/Deny" buttons
// When no rides, show text "No rides available"
// When ride accepted, send driver information to user map

function DriverHomeScreen() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rideAccepted, setRideAccepted] = useState(false);
  const [rideDenied, setRideDenied] = useState(false);
  const [destination, setDestination] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    const ridecollection = collection(db, "Rides");
    const unsubscribe = onSnapshot(ridecollection, (snapshot) => {
      const ridesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRides(ridesData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading rides...</Text>
      </View>
    );
  }

  return (
    //  <View style={{ flex: 1, alignItems:   
    //        'center', justifyContent: 'center' }}>
    //    <Text>Driver Home Screen</Text>
    //  </View>

     <View style={styles.mapContainer}>
           <Text style={styles.headerTitle}>Welcome Back</Text>
     
           <View style={styles.map}>
             <MapRS userType={"driver"} destination = {destination}/>
           </View>

            <Text style={styles.headerTitle}>Available Rides</Text>
            <View style={styles.rideRequests}>
              {rides.length > 0 ? (
                <FlatList
                  data={rides}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.rideRequest}>
                      <Text>Pickup: {item.pickupLocation ? JSON.stringify(item.pickupLocation) : "No Pickup Location"}</Text>
                      <Text>Dropoff: {item.dropoffLocation ? JSON.stringify(item.dropoffLocation) : "No Drop Off Location"}</Text>
                      <Text>Rider: {item.displayName || "Unknown Rider"}</Text>
                      <View style={styles.buttonContainer}>
                        <Button title="Accept" onPress={() => {
                          handleAcceptRide(item);
                          setRideAccepted(true);
                          setDestination(item.pickupLocation);
                        }} />
                        <Button title="Deny" onPress={() => { 
                          handleDenyRide(item);
                          setRideDenied(true);
                        }} />
                      </View>
                    </View>
                  )}
                />
              ) : (
                <Text>No rides available</Text>
              )}
            </View>

            {rideAccepted && (
              <Text style={styles.successMessage}>Ride Accepted!</Text>
            )}

      </View>
  );

  function handleAcceptRide(ride) {
    console.log("Ride Accepted: ", ride);
    // Add FB function to update ride status to accepted with driver info
  }

  function handleDenyRide(ride) {
    console.log("Ride Denied: ", ride);
    // No FB function, just remove from list show to this specific driver
  }
}

export default DriverHomeScreen;