import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QueueCard({ item }: { item: any }) {
  return (
    <View style={styles.card}>
      <Text style={styles.id}>#{item.id?.slice?.(0, 6)}</Text>
      <Text>{item.status}</Text>
      <Text style={styles.time}>{item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', marginBottom: 8 },
  id: { fontWeight: '700' },
  time: { color: '#666', fontSize: 12, marginTop: 6 },
});
