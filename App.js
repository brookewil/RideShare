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
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';

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

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
        <Tab.Navigator initialRouteName='HomeTab'
        screenOptions={{ headerShown: false, 
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#ccc',
            tabBarHideOnKeyboard: 'true',
            tabBarStyle: {
              backgroundColor: '#450000',
              paddingTop: 5,
              paddingBottom: 20,
              height: 60,
            },}}>

          <Tab.Screen name="HomeTab" component={HomeStack} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} />


            <Tab.Screen name="Chat" component={ChatScreen} 
            options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox" color={color} size={size} />
            ),
        }} />
            <Tab.Screen name="Profile" component={ProfileScreen} 
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
            ),
        }} />
        </Tab.Navigator>
   )
}

export default function App() {
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigator /> : <AuthStack setIsLoggedIn={setIsLoggedIn}/>}
    </NavigationContainer>
  );
}