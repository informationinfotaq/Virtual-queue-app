import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Shop } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const shops: Shop[] = [
  { id: '1', name: 'Coffee Corner', estWait: 15 },
  { id: '2', name: 'Pizza Point', estWait: 20 },
  { id: '3', name: 'Salon Hub', estWait: 10 },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, theme === 'dark' ? styles.darkText : styles.lightText]}>Available Shops</Text>

      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, theme === 'dark' ? styles.darkCard : styles.lightCard]}
            onPress={() => navigation.navigate('QueueScreen',{ shop:item })}
          >
            <Text style={[styles.name, theme === 'dark' ? styles.darkText : styles.lightText]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  lightContainer: { backgroundColor: '#fff' },
  darkContainer: { backgroundColor: '#121212' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#8A2BE2' },
  lightText: { color: '#000' },
  darkText: { color: '#fff' },
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  lightCard: { backgroundColor: '#f0f0f0' },
  darkCard: { backgroundColor: '#333' },
  name: { fontSize: 18, fontWeight: '500' },
});
