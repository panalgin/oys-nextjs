import { Button } from '@/client/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/client/firebase';
import { UserService } from '../services/user-service';

export function GoogleSignInButton() {
	const handleSignIn = async () => {
		try {
			console.log('Attempting to sign in...');
			const credentials = await signInWithPopup(auth, googleProvider);
			console.log('Firebase sign-in successful');

			const idToken = await credentials.user.getIdToken();
			UserService.login(idToken);

		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

	return (
		<Button onClick={handleSignIn} className="w-full">
			<FcGoogle className="mr-2 h-4 w-4" />
			Google ile Giriş Yap
		</Button>
	);
}
