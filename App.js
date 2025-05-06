import 'react-native-get-random-values';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import {getFirestore, doc, getDoc} from 'firebase/firestore';
import app from './firebaseConfig.js';

import LoginScreen from './screens/LoginScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import DriverHomeScreen from './screens/DriverHomeScreen';
import RequestScreen from './screens/RequestScreen';
import PlanRideScreen from './screens/PlanRideScreen';
import RideStatusScreen from './screens/RideStatusScreen';
import SignUpScreen from './SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import MessageScreen from './screens/MessageScreen';
import { ChatScreen } from './screens/ChatScreen';


 const Stack = createNativeStackNavigator();

 function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

const HomeStack = () => {
   
    return (
      <Stack.Navigator initialRouteName="UserHome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
        <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
        <Stack.Screen name="UserHome" component={UserHomeScreen} />
        <Stack.Screen name="Request" component={RequestScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="PlanRide" component={PlanRideScreen} />
        <Stack.Screen name="RideStatus" component={RideStatusScreen} />
      </Stack.Navigator>
    )
}

const MessageStack = ({navigation}) => {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessageScreen}/>
      <Stack.Screen 
      name="Chat" 
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName
      })}/>
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Stack.Navigator initialRouteName="UserHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
      <Stack.Screen name="UserHome" component={UserHomeScreen} />
      <Stack.Screen name="Request" component={RequestScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="PlanRide" component={PlanRideScreen} />
      <Stack.Screen name="RideStatus" component={RideStatusScreen} />
    </Stack.Navigator>
  );
};

export function TabNavigator({ setIsLoggedIn }) {
  const Tab = createBottomTabNavigator();
  const [isDriver, setIsDriver] = React.useState(false);
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setIsLoggedIn(false); // Update the state to trigger navigation to AuthStack
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'There was an error logging out.');
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
        tabBarHideOnKeyboard: 'true',
        tabBarStyle: {
          backgroundColor: '#450000',
          paddingTop: 5,
          paddingBottom: 20,
          height: 75,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="DriverHome"
        component={DriverHomeScreen}
        options={{
          tabBarLabel: 'Driver Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={MessageStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbox" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Logout"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size }) => <Ionicons name="exit-outline" color={color} size={size} />,
        }}
      >
        {() => null}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigator setIsLoggedIn={setIsLoggedIn} /> : <AuthStack setIsLoggedIn={setIsLoggedIn} />}
    </NavigationContainer>
  );
}