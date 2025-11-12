import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Shop } from '../navigation/types';

type QueueScreenRouteProp = RouteProp<RootStackParamList, 'QueueScreen'>;

export default function QueueScreen() {
  const route = useRoute<QueueScreenRouteProp>();
  const navigation = useNavigation();
  const { shop } = route.params;

  // Hardcoded queue of people in front (for demo)
  const peopleInFront = [
    { name: 'Alice', estWait: 5 },
    { name: 'Bob', estWait: 3 },
  ];

  // Calculate initial remaining time in seconds (sum of estWait in minutes * 60)
  const initialRemainingTime = peopleInFront.reduce((sum, person) => sum + person.estWait * 60, 0);

  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [remainingTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Queue for {shop.name}</Text>
      <Text>Estimated wait per person: {shop.estWait} mins</Text>
      <Text>Your position: {peopleInFront.length + 1}</Text>
      <Text style={styles.sectionTitle}>People in front:</Text>
      {peopleInFront.map((person, index) => (
        <Text key={index} style={styles.personText}>
          {person.name}: {person.estWait} mins
        </Text>
      ))}
      <Text style={styles.countdown}>
        Time until your turn: {remainingTime > 0 ? formatTime(remainingTime) : 'Your turn!'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  backButton: { position: 'absolute', top: 20, left: 20 },
  backText: { fontSize: 18, color: 'blue' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  personText: { fontSize: 16, marginBottom: 5 },
  countdown: { fontSize: 20, fontWeight: 'bold', color: 'green', marginTop: 20 },
});
