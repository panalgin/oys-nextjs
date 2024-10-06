import { onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useUserStore } from './store/user-store';
import { User as FirebaseUser } from 'firebase/auth';
import { User } from '../common/user';

export const setupAuthStateListener = () => {
	console.log('Subscribing to auth state changes');

	return firebaseOnAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
		const setUser = useUserStore.getState().setUser;
		const storeUser = useUserStore.getState().user;
		if (firebaseUser) {
			const authenticated = auth
			const user: User = {
				uid: firebaseUser.uid,
				email: firebaseUser.email ?? '',
				displayName: firebaseUser.displayName ?? '',
				photoURL: firebaseUser.photoURL ?? '',
				roles: [],
			};

			if (storeUser !== user) {
				console.log("Setting store user to current firebase user:", user);
				setUser(user);
			}

			return;
		}
		else {
			if (storeUser !== null) {
			console.log("Setting store user to null");
				setUser(null);
			}
		}
	});
};