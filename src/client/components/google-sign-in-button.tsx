import { Button } from '@/client/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/client/firebase';
import { AuthService } from '../auth-service';

export function GoogleSignInButton() {
	const handleSignIn = async () => {
		try {
			console.log('Attempting to sign in...');
			await signInWithPopup(auth, googleProvider);
			console.log('Firebase sign-in successful');

			const firebaseUser = auth.currentUser;

			if (firebaseUser) {
				AuthService.login(firebaseUser);
			} else {
				console.error('No user found after sign-in');
			}
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
