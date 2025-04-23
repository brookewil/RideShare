import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import DriverHomeScreen from './screens/DriverHomeScreen';
import RequestScreen from './screens/RequestScreen';
import PlanRideScreen from './screens/PlanRideScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="UserHome" component={UserHomeScreen} />
                <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
                <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
                <Stack.Screen name="Request" component={RequestScreen} />
                <Stack.Screen name="PlanRide" component={PlanRideScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        
     );
}

export default App;