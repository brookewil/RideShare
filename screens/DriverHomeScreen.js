import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, onSnapshot, doc, getDocs, updateDoc } from 'firebase/firestore';
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
  const [selectedRide, setSelectedRide] = useState(null);
  
  const db = getFirestore(app);

  // NOTE: This uses "Rides" with a capital R, there is also "rides" in FB DB
  useEffect(() => {
    const ridecollection = collection(db, "Rides");
    const unsubscribe = onSnapshot(ridecollection, (snapshot) => {
      const ridesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRides(ridesData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Loading text
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
          <MapRS
          userType={"driver"}
          destination = {selectedRide ? selectedRide.pickupLocation : destination}
          onLocationChange={(location, destination) => {
            if (!selectedRide) {
              setDestination(destination);
            }
            // setPickupLocation(userLocation);
          }}
          />
        </View>

        {selectedRide ? (
          <View style={styles.ridePreview}>
            <Text style={styles.headerTitle}>Ride Preview</Text>
            <Text>Pickup: {JSON.stringify(selectedRide.pickupLocation)}</Text>
            <Text>Dropoff: {JSON.stringify(selectedRide.dropoffLocation)}</Text>
            <Text>Rider: {selectedRide.displayName || "Unknown Rider"}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Accept"
                onPress={() => handleAcceptRide(selectedRide)}
              />
              <Button
                title="Deny"
                onPress={() => setSelectedRide(null)} // Exit preview
              />
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.headerTitle}>Available Rides</Text>
            <View style={styles.rideRequests}>
              {rides.length > 0 ? (
                <FlatList
                  data={rides}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.rideRequest}
                      onPress={() => setSelectedRide(item)} // Show preview on tap
                    >
                      <Text>
                        Pickup:{" "}
                        {item.pickupLocation
                          ? `Lat: ${item.pickupLocation.latitude}, Lng: ${item.pickupLocation.longitude}`
                          : "No Pickup Location"}
                      </Text>
                      <Text>
                        Dropoff:{" "}
                        {item.dropoffLocation
                          ? `Lat: ${item.dropoffLocation.latitude}, Lng: ${item.dropoffLocation.longitude}`
                          : "No Drop Off Location"}
                      </Text>
                      <Text>Rider: {item.displayName || "Unknown Rider"}</Text>
                    </TouchableOpacity>
                  )}
                />
              ) : ( 
                <Text>No rides available</Text>
              )}
            </View>
          </View>
        )}
          {rideAccepted && (
            <Text style={styles.successMessage}>Ride Accepted!</Text>
          )}

      </View>
  );

  function handleAcceptRide(ride) {
    console.log("Ride Accepted: ", ride);
    const rideRef = doc(db, "Rides", ride.id);
    
    updateDoc(rideRef, {
      status: "accepted",
      // driverID: user.uid,
      // driverName: user.displayName || "Anonymous"
    })
    // Add FB function to update ride status to accepted with driver info
    // Show map, change destination to pickupLocation (user location)
    setRideAccepted(true);
    setDestination(ride.pickupLocation);
  }

  function handleDenyRide(ride) {
    console.log("Ride Denied: ", ride);
    // No FB function, just remove from list show to this specific driver
  }
}

export default DriverHomeScreen;