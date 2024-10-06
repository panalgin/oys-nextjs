import { Button } from '@/client/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { useToast } from '@/client/components/ui/use-toast';
import { UserSignInDto } from '@/common/user-sign-in.dto';
import { auth, googleProvider } from '@/client/firebase';
import { User } from '@/common/user';
import useUser from '@/client/store/user-store';

export function GoogleSignInButton() {
	const { toast } = useToast();
  const { setUser } = useUser();

	const handleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const user: User =  {
				uid: result.user.uid,
				email: result.user.email ?? '',
				displayName: result.user.displayName ?? '',
				photoURL: result.user.photoURL ?? '',
				roles: [], // TODO: Fetch roles from server
			}

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

			setUser(user);

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
