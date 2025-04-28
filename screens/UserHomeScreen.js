import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles.js';
import MapRS from '../Map';

const Tab = createBottomTabNavigator();

// The original home content with the map and buttons
function HomeTab() {
  const navigation = useNavigation();

  return (
     <View style={styles.mapContainer}>

        <Text style={styles.headerTitle}>Welcome Back</Text>
        <View style = {styles.map}>
          <MapRS/>
        </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Request')}>
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PlanRide')}>
        <Text style={styles.buttonText}>Plan a Ride</Text>
      </TouchableOpacity>
    </View>
  );
}

// Placeholder Chat tab
function ChatTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat Screen</Text>
    </View>
  );
}

// Placeholder Profile tab
function ProfileTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

// Main User Home Screen with embedded bottom tabs
function UserHomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          backgroundColor: '#450000',
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Chat') iconName = 'chatbox';
          else if (route.name === 'Profile') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Chat" component={ChatTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
}

export default UserHomeScreen;
