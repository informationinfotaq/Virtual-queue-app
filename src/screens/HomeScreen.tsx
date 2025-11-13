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
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Available Shops</Text>

      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { borderColor: colors.border }]}
            onPress={() => navigation.navigate('QueueScreen', { shop: item })}
          >
            <View style={[styles.gradient, { backgroundColor: colors.primary }]}>
              <Text style={[styles.name, { color: colors.surface }]}>{item.name}</Text>
              <Text style={[styles.estWait, { color: colors.surface }]}>Est. Wait: {item.estWait} min</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    padding: 20,
    alignItems: 'center',
  },
  name: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
  estWait: { fontSize: 14, opacity: 0.9 },
});
