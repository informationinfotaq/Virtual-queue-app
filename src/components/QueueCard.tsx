import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function QueueCard({ item }: { item: any }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.id, { color: colors.primary }]}>#{item.id?.slice?.(0, 6)}</Text>
      <Text style={{ color: colors.text }}>{item.status}</Text>
      <Text style={[styles.time, { color: colors.textSecondary }]}>
        {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  id: { fontWeight: '700', fontSize: 16 },
  time: { fontSize: 12, marginTop: 6 },
});
