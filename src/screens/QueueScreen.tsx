import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Shop } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';

type QueueScreenRouteProp = RouteProp<RootStackParamList, 'QueueScreen'>;

export default function QueueScreen() {
  const route = useRoute<QueueScreenRouteProp>();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { shop } = route.params;

  // Initial hardcoded queue of people in front (for demo)
  const initialPeople = [
    { name: 'Alice', estWait: 1 },
    { name: 'Bob', estWait: 2 },
  ];

  const [peopleInFront, setPeopleInFront] = useState(initialPeople);
  const [personTimes, setPersonTimes] = useState(initialPeople.map(person => person.estWait * 60));
  const [remainingTime, setRemainingTime] = useState(initialPeople.reduce((sum, person) => sum + person.estWait * 60, 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setPersonTimes(prevTimes => {
        const newTimes = prevTimes.map(time => time > 0 ? time - 1 : 0);
        // Filter out people whose time is up
        const activeIndices = newTimes.map((time, index) => time > 0 ? index : -1).filter(idx => idx !== -1);
        const newPeople = peopleInFront.filter((_, index) => activeIndices.includes(index));
        const newTimesFiltered = newTimes.filter(time => time > 0);
        const newRemaining = newTimesFiltered.reduce((sum, time) => sum + time, 0);
        setPeopleInFront(newPeople);
        setPersonTimes(newTimesFiltered);
        setRemainingTime(newRemaining);
        return newTimesFiltered;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [peopleInFront]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
    },
    backButton: { position: 'absolute', top: 20, left: 20 },
    backText: { fontSize: 18, color: '#8A2BE2' },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    personText: {
      fontSize: 16,
      marginBottom: 5,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    countdown: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : 'green',
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Queue for {shop.name}</Text>
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Your position: {peopleInFront.length + 1}</Text>
      <Text style={styles.sectionTitle}>People in front:</Text>
      {peopleInFront.map((person, index) => (
        <Text key={index} style={styles.personText}>
          {person.name}: {formatTime(personTimes[index])}
        </Text>
      ))}
      <Text style={styles.countdown}>
        {remainingTime > 0 ? `Time until your turn: ${formatTime(remainingTime)}` : 'Your turn!'}
      </Text>
    </View>
  );
}
