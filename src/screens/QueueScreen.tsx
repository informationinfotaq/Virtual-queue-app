import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type QueueScreenRouteProp = RouteProp<RootStackParamList, 'QueueScreen'>;

export default function QueueScreen() {
  const route = useRoute<QueueScreenRouteProp>();
  const { shop } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Queue for {shop.name}</Text>
      <Text>Estimated wait: {shop.estWait} mins</Text>
      <Text>Your position: 1</Text> {/* Placeholder */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
