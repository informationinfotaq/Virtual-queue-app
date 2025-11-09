import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text>Dark Mode</Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
});
