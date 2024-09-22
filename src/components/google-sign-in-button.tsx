import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, User } from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';
import { UserSignInDto } from '@/lib/contacts/user-sign-in.dto';

interface GoogleSignInButtonProps {
	onSignIn: (user: User) => void;
}

export function GoogleSignInButton({ onSignIn }: GoogleSignInButtonProps) {
	const { toast } = useToast();

	const handleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const user = result.user;

			const userSignInDto: UserSignInDto = {
				uid: user.uid,
				email: user.email ?? '',
				displayName: user.displayName ?? '',
				photoURL: user.photoURL ?? '',
			};

			// Send POST request to /api/auth/sign-in
			await fetch('/api/auth/sign-in', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userSignInDto),
			});

			onSignIn(user);

			toast({
				title: 'Giriş başarılı',
				description: `Hoş geldiniz, ${user.displayName}!`,
			});
		} catch (error) {
			toast({
				title: 'Giriş başarısız',
				description: `Giriş yapılırken bir hata oluştu: ${
					error instanceof Error ? error.message : 'Bilinmeyen hata'
				}`,
				variant: 'destructive',
			});
		}
	};

	return (
		<Button onClick={handleSignIn} className="w-full">
			<FcGoogle className="mr-2 h-4 w-4" />
			Google ile Giriş Yap
		</Button>
	);
}
