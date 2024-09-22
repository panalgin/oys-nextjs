import { User } from '../common/user';
import { firestore } from './firebase-admin';

export async function getUserByUid(uid: string): Promise<User | null> {
  const userRef = firestore.collection('users').doc(uid);
  const doc = await userRef.get();

  if (!doc.exists) {
    return null;
  } else {
    return doc.data() as User;
  }
}