import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navigate to Login screen after logout
      navigation.replace('Login');
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
  lightContainer: { backgroundColor: '#fff' },
  darkContainer: { backgroundColor: '#121212' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 , color: '#8A2BE2'},
});
