import { db, auth } from '../firebaseConfig';
import { doc, getDoc, updateDoc, setDoc, arrayUnion, arrayRemove, Timestamp } from 'firebase/firestore';

export interface QueueEntry {
  userId: string;
  joinedAt: Timestamp;
}

export const joinQueue = async (shopId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const queueRef = doc(db, 'queues', shopId);
    const queueSnap = await getDoc(queueRef);

    if (queueSnap.exists()) {
      const queueData = queueSnap.data();
      const existingEntry = queueData.entries?.find((entry: QueueEntry) => entry.userId === user.uid);
      if (existingEntry) throw new Error('Already in queue');

      await updateDoc(queueRef, {
        entries: arrayUnion({ userId: user.uid, joinedAt: Timestamp.now() })
      });
    } else {
      await setDoc(queueRef, {
        entries: [{ userId: user.uid, joinedAt: Timestamp.now() }]
      });
    }
    console.log('Successfully joined queue for shop:', shopId);
  } catch (error) {
    console.error('Error joining queue:', error);
    throw error;
  }
};

export const leaveQueue = async (shopId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const queueRef = doc(db, 'queues', shopId);
    const queueSnap = await getDoc(queueRef);

    if (queueSnap.exists()) {
      const queueData = queueSnap.data();
      const entryToRemove = queueData.entries?.find((entry: QueueEntry) => entry.userId === user.uid);
      if (entryToRemove) {
        await updateDoc(queueRef, {
          entries: arrayRemove(entryToRemove)
        });
      }
    }
    console.log('Successfully left queue for shop:', shopId);
  } catch (error) {
    console.error('Error leaving queue:', error);
    throw error;
  }
};

export const getQueue = async (shopId: string): Promise<QueueEntry[]> => {
  try {
    const queueRef = doc(db, 'queues', shopId);
    const queueSnap = await getDoc(queueRef);

    if (queueSnap.exists()) {
      const queueData = queueSnap.data();
      console.log('Fetched queue data for shop:', shopId, queueData.entries);
      return queueData.entries || [];
    }
    console.log('No queue data found for shop:', shopId);
    return [];
  } catch (error) {
    console.error('Error fetching queue:', error);
    throw error;
  }
};
