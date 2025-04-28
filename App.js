import 'react-native-get-random-values';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import DriverHomeScreen from './screens/DriverHomeScreen';
import RequestScreen from './screens/RequestScreen';
import PlanRideScreen from './screens/PlanRideScreen';
import RideStatusScreen from './screens/RideStatusScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
   
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
        <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
        <Stack.Screen name="Ride Status" component={RideStatusScreen} />
      </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
        <Tab.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="UserHome" component={UserHomeScreen} 
            options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
            ),
        }} />
            <Tab.Screen name="Request" component={RequestScreen} 
            options={{
            tabBarLabel: 'Request',
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
            ),
        }} />
            <Tab.Screen name="Plan a Ride" component={PlanRideScreen} 
            options={{
                tabBarLabel: 'Plan a Ride',
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="alarm" color={color} size={size} />
            ),
        }} />
        </Tab.Navigator>
   )
}

export default function App() {
    return (
        <NavigationContainer>
           <TabNavigator />
         </NavigationContainer>
        
     );
}