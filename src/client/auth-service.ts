import { User as FirebaseUser } from "firebase/auth";
import { User } from "../common/user";

import { auth } from "./firebase";
import { initialUserState } from "./store/states/initial-user-state";
import { useUserStore } from "./store/user-store";
import { UserSignInDto } from "../common/user-sign-in.dto";

export abstract class AuthService {
		public static async login(firebaseUser: FirebaseUser) {
			const user: User = {
				uid: firebaseUser.uid,
				email: firebaseUser.email ?? '',
				displayName: firebaseUser.displayName ?? '',
				photoURL: firebaseUser.photoURL ?? '',
			};

			const { user: currentUser } = useUserStore.getState();

			if (currentUser !== null) {
				console.log("User already set to current firebase user, skipping");
				return;
			}

			const signInDto: UserSignInDto = {
				uid: firebaseUser.uid,
				email: firebaseUser.email ?? '',
				displayName: firebaseUser.displayName ?? '',
				photoURL: firebaseUser.photoURL ?? '',
			};

			const response = await fetch('/api/auth/sign-in', {
				method: 'POST',
				body: JSON.stringify(signInDto),
			});

			if (response.ok) {
				console.log("User authenticated on our backend");
			} else {
				console.log("User authentication failed on our backend");
			}

			console.log("Setting store user to current firebase user:", user);			
			useUserStore.setState({ user });
		}

    public static async logout() {
        await auth.signOut();
				useUserStore.setState(initialUserState);
				console.log("User logged out");
    }
}