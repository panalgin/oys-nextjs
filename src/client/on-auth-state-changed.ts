import { onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useUserStore } from './store/user-store';
import { User as FirebaseUser } from 'firebase/auth';

import { AuthService } from './auth-service';

export const setupAuthStateListener = () => {
	console.log('Subscribing to auth state changes');

	return firebaseOnAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
		const user = useUserStore.getState().user;
		
		if (firebaseUser) {
			if (user !== null) {
				console.log("User already set to current firebase user, skipping");
				return;
			}

			if (user == null) {
				console.log("Setting store user to current firebase user:", user);
				AuthService.login(firebaseUser);
			}

			return;
		}
	});
};