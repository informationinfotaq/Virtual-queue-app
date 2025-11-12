import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { doc, setDoc } from 'firebase/firestore';

type Props = NativeStackScreenProps<any, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Create user with Firebase Authentication
      const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);

      // Store user details in Firestore
      await setDoc(doc(db, 'users', userCred.user.uid), {
        email: userCred.user.email,
        createdAt: new Date(),
      });

      Alert.alert('Success', 'Account created successfully!');
      
      // Navigate to Home screen after signup
      navigation.replace('Home');  // 👈 THIS IS THE FIX

    } catch (e: any) {
      Alert.alert('Sign up failed', e.message || 'Unknown error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignUp} />
      <View style={{ height: 12 }} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
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
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});



