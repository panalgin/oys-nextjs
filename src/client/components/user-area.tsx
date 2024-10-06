import React, { Suspense } from 'react';
import AccountPanel from './account-panel';
import { GoogleSignInButton } from './google-sign-in-button';
import { AuthService } from '../auth-service';
import Skeleton from './ui/skeleton';
import { useUserStore } from '../store/user-store';

const UserAreaContent: React.FC = () => {
	const { user, isLoading } = useUserStore();

	const handleSignOut = () => {
		AuthService.logout();
	};

	if (isLoading) {
		return <Skeleton className="h-16 w-full" />;
	}

	if (user) {
		console.log('User found, rendering AccountPanel');
		return (
			<AccountPanel key={user.uid} onSignOut={handleSignOut} user={user} />
		);
	}

	console.log('No user found, rendering GoogleSignInButton');
	return <GoogleSignInButton />;
};

const UserArea: React.FC = () => {
	return (
		<Suspense fallback={<Skeleton className="h-16 w-full" />}>
			<UserAreaContent />
		</Suspense>
	);
};

UserArea.displayName = 'UserArea';

export default UserArea;
