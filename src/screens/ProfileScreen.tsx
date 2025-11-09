import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function ProfileScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // signing out will not automatically switch stacks here; you can handle onAuthStateChanged later
      Alert.alert('Logged out');
    } catch (e: any) {
      Alert.alert('Logout failed', e.message || 'Unknown');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <View style={{ height: 12 }} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
});
