import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MapRS from '../Map';
import * as Location from 'expo-location';
import { GOOGLE_API_KEY } from '@env';

// Mock Location module
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

const IC_COORDS = {
  latitude: 42.422668,
  longitude: -76.494209,
};

describe('Map.js Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test UserLocation function
  it('should return the user location when permissions are granted', async () => {
    const mockCoords = { latitude: 40.7128, longitude: -74.006 }; // Mocked user location
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
    Location.getCurrentPositionAsync.mockResolvedValueOnce({ coords: mockCoords });

    const userLocation = await Location.getCurrentPositionAsync();
    expect(userLocation.coords).toEqual(mockCoords);
  });

  it('should return null when location permissions are denied', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });

    const userLocation = await Location.getCurrentPositionAsync();
    expect(userLocation).toBeNull();
  });

  // Test MapRS renders correctly
  it('should render the MapRS component with user location and destination', async () => {
    const mockCoords = { latitude: 40.7128, longitude: -74.006 }; // Mocked user location
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
    Location.getCurrentPositionAsync.mockResolvedValueOnce({ coords: mockCoords });

    const { getByText } = render(
      <MapRS
        userType="rider"
        destination={{ latitude: 42.4492, longitude: -76.4844 }}
        onLocationChange={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(getByText('Your Location')).toBeTruthy();
      expect(getByText('Destination')).toBeTruthy();
    });
  });

  // Compare UserLocation to IC_COORDS
  it('should fall back to IC_COORDS when user location is not available', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });

    const { getByText } = render(
      <MapRS
        userType="rider"
        destination={IC_COORDS}
        onLocationChange={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(getByText('Your Location')).toBeTruthy();
    });
  });

  // MapViewDirections renders correctly
  it('should render MapViewDirections when destination is provided', async () => {
    const mockCoords = { latitude: 40.7128, longitude: -74.006 }; // Mocked user location
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
    Location.getCurrentPositionAsync.mockResolvedValueOnce({ coords: mockCoords });

    const { getByText } = render(
      <MapRS
        userType="rider"
        destination={{ latitude: 42.4492, longitude: -76.4844 }}
        onLocationChange={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(getByText('Destination')).toBeTruthy();
    });
  });

  // Handle missing GOOGLE_API_KEY
  it('should log an error when GOOGLE_API_KEY is undefined', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(
      <MapRS
        userType="rider"
        destination={{ latitude: 42.4492, longitude: -76.4844 }}
        onLocationChange={jest.fn()}
      />
    );

    expect(console.error).toHaveBeenCalledWith('🚨 GOOGLE_API_KEY is undefined! Check your .env setup.');
  });
});