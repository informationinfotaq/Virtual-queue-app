import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Shop } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { auth } from '../firebaseConfig';
import { joinQueue, leaveQueue, getQueue, QueueEntry } from '../services/queueService';

type QueueScreenRouteProp = RouteProp<RootStackParamList, 'QueueScreen'>;

export default function QueueScreen() {
  const route = useRoute<QueueScreenRouteProp>();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { shop } = route.params;

  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [isInQueue, setIsInQueue] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      Alert.alert('Authentication Required', 'Please log in to join queues.');
      navigation.goBack();
      return;
    }
    fetchQueue();
  }, [shop.id]);

  const fetchQueue = async () => {
    try {
      const queueData = await getQueue(shop.id);
      setQueue(queueData.sort((a, b) => a.joinedAt.seconds - b.joinedAt.seconds));
      setIsInQueue(queueData.some(entry => entry.userId === user?.uid));
    } catch (error) {
      console.error('Error fetching queue:', error);
    }
  };

  const handleJoinQueue = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await joinQueue(shop.id);
      await fetchQueue();
      Alert.alert('Success', 'Joined the queue!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const handleLeaveQueue = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await leaveQueue(shop.id);
      await fetchQueue();
      Alert.alert('Success', 'Left the queue!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const userPosition = queue.findIndex(entry => entry.userId === user?.uid) + 1;

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
      backgroundColor: colors.background,
    },
    backButton: { position: 'absolute', top: 20, left: 20 },
    backText: { fontSize: 18, color: colors.primary },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: colors.text,
    },
    personText: {
      fontSize: 16,
      marginBottom: 5,
      color: colors.textSecondary,
    },
    countdown: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.success,
      marginTop: 20,
    },
    button: {
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
      width: 150,
      overflow: 'hidden',
    },
    gradient: {
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      width: '100%',
    },
    leaveButton: {
      backgroundColor: colors.error,
    },
    buttonText: {
      color: colors.surface,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  const peopleInFront = queue.slice(0, userPosition - 1);
  const estimatedWaitTime = peopleInFront.length * shop.estWait * 60; // in seconds

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Queue for {shop.name}</Text>
      <Text style={{ color: colors.text }}>Your position: {userPosition || 'Not in queue'}</Text>
      <Text style={styles.sectionTitle}>People in front: {peopleInFront.length}</Text>
      {peopleInFront.map((entry, index) => (
        <Text key={entry.userId} style={styles.personText}>
          Person {index + 1}: Joined at {entry.joinedAt.toDate().toLocaleTimeString()}
        </Text>
      ))}
      <Text style={styles.countdown}>
        {estimatedWaitTime > 0 ? `Estimated wait: ${formatTime(estimatedWaitTime)}` : 'Your turn!'}
      </Text>
      {!isInQueue ? (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleJoinQueue} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Joining...' : 'Join Queue'}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.leaveButton]} onPress={handleLeaveQueue} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Leaving...' : 'Leave Queue'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
