import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { styles } from '../styles.js'; // Import your styles

function RideStatusScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [dots, setDots] = useState('');

  // Dot animation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval); // Clean up interval when component unmounts
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={styles.headerTitle}>
        Looking for Driver{dots}
      </Text>
      {/* Loading indicator with red color */}
      <ActivityIndicator size="large" color="#450000" />
    </View>
  );
}

export default RideStatusScreen;
