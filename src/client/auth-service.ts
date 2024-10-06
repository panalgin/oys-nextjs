import { User } from "../common/user";
import { auth } from "./firebase";
import { initialUserState } from "./store/states/initial-user-state";
import { useUserStore } from "./store/user-store";

export abstract class AuthService {
		public static login(user: User) {
			useUserStore.setState({ user });
		}

    public static async logout() {
        await auth.signOut();
				useUserStore.setState(initialUserState);
				console.log("User logged out");
    }
}