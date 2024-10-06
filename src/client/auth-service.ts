import { User as FirebaseUser } from "firebase/auth";
import { User } from "../common/user";

import { auth } from "./firebase";
import { initialUserState } from "./store/states/initial-user-state";
import { useUserStore } from "./store/user-store";
import { UserSignInDto } from "../common/user-sign-in.dto";

// TODO: Move this to a user service, make it DI injectable, not a static class
export abstract class AuthService {
	private static async getUser(accessToken: string): Promise<User> {
		const response = await fetch('/api/users/me', {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		});
		
		if (!response.ok) {
			throw new Error('Failed to fetch user');
		}

		const user = await response.json() as User;
		console.log("User fetched:", user);

		return user;
	}

	public static async login(firebaseUser: FirebaseUser) {
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

		useUserStore.setState({ isLoading: true });

		const response = await fetch('/api/auth/sign-in', {
			method: 'POST',
			body: JSON.stringify(signInDto),
		});

		if (response.ok) {
			console.log("User authenticated on our backend");
			console.log("Firebase user:", firebaseUser);
			console.log("Existing store user:", currentUser);

			const accessToken = (await response.json()).access_token;
			//const refreshToken = (await response.json()).refresh_token;

			const user: User = await this.getUser(accessToken);

			useUserStore.setState({ user: user, isLoading: false });
		} else {
			console.log("User authentication failed on our backend");
		}

		useUserStore.setState({ isLoading: false });
	}

	public static async logout() {
		await auth.signOut();
		useUserStore.setState(initialUserState);
		console.log("User logged out");
	}
}