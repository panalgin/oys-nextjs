import { Button } from '@/client/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/client/firebase';

export function GoogleSignInButton() {
	const handleSignIn = async () => {
		try {
			console.log('Attempting to sign in...');
			await signInWithPopup(auth, googleProvider);
			console.log('Sign-in successful');
			// Firebase Auth listener will handle updating the store
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
