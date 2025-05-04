import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const GOOGLE_API = process.env.GOOGLE_API_KEY;

export default function LocationSearch({ onSelect }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length < 2) return;

      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&key=${GOOGLE_API}&components=country:us`;

      try {
        const res = await fetch(url);
        const json = await res.json();
        setSuggestions(json.predictions || []);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    };

    fetchSuggestions();
  }, [input]);

  const handleSelect = async (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      const loc = json.result.geometry.location;

      // Pass location back to parent
      onSelect({ latitude: loc.lat, longitude: loc.lng });
      setInput('');
      setSuggestions([]);
    } catch (err) {
      console.error('Error fetching place details:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Search for a place"
        style={styles.input}
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelect(item.place_id)}
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 10,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  item: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});
