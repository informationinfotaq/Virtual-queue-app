import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const shops: { id: string; name: string; estWait: number }[] = [
  { id: '1', name: 'Coffee Corner', estWait: 5 },
  { id: '2', name: 'Pizza Point', estWait: 10 },
  { id: '3', name: 'Salon Hub', estWait: 20 },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Shops</Text>

      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('QueueScreen',{ shop:item })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>Est. wait: {item.estWait} mins</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: '500' },
});
