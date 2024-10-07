import { onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useUserStore } from './store/user-store';
import { User as FirebaseUser } from 'firebase/auth';
import { UserService } from './services/user-service';

export const setupAuthStateListener = () => {
	console.log('Subscribing to auth state changes');

	return firebaseOnAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
		const { user } = useUserStore.getState();
		
		console.log('Auth state changed', { firebaseUser, user });

		if (firebaseUser) {
			if (user !== null && user.uid === firebaseUser.uid) {
				console.log("User already set to current firebase user, skipping");
				return;
			}

			
		} else {
			console.log("No firebase user, setting store user to null");
			UserService.logout();
		}
	});
};