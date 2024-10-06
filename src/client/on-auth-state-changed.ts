import { onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useUserStore } from './store/user-store';
import { User as FirebaseUser } from 'firebase/auth';
import { User } from '../common/user';
import { AuthService } from './auth-service';

export const setupAuthStateListener = () => {
	console.log('Subscribing to auth state changes');

	return firebaseOnAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
		const storeUser = useUserStore.getState().user;
		
		if (firebaseUser) {
			if (storeUser !== null) {
				console.log("User already set to current firebase user, skipping");
				return;
			}

			const user: User = {
				uid: firebaseUser.uid,
				email: firebaseUser.email ?? '',
				displayName: firebaseUser.displayName ?? '',
				photoURL: firebaseUser.photoURL ?? '',
				roles: [],
			};

			if (storeUser !== user) {
				console.log("Setting store user to current firebase user:", user);
				AuthService.login(user);
			}

			return;
		}
	});
};