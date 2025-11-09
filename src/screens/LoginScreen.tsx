import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log('User logged in:', userCred.user.email);

      Alert.alert('Success', 'Login successful!');

      // Navigate to home screen after login
      navigation.replace('Home'); // ✅ consistent with your SignUpScreen
    } catch (e: any) {
      let message = e.message;

      if (e.code === 'auth/user-not-found') message = 'No account found with this email.';
      else if (e.code === 'auth/wrong-password') message = 'Incorrect password.';
      else if (e.code === 'auth/invalid-email') message = 'Invalid email format.';

      Alert.alert('Login failed', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
      <View style={{ height: 12 }} />
      <Button title="Create account" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});
