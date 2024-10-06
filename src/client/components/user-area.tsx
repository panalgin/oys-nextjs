import React, { Suspense } from 'react';
import AccountPanel from './account-panel';
import { GoogleSignInButton } from './google-sign-in-button';
import { AuthService } from '../auth-service';
import { useUser } from '../hooks/use-user';
import Skeleton from './ui/skeleton';

const UserAreaContent: React.FC = () => {
	const user = useUser();

	const handleSignOut = () => {
		AuthService.logout();
	};

	if (user) {
		return <AccountPanel key={user.uid} onSignOut={handleSignOut} user={user} />;
	}

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
