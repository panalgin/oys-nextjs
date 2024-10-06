import React from 'react';
import AccountPanel from './account-panel';
import { GoogleSignInButton } from './google-sign-in-button';
import Skeleton from './ui/skeleton';
import { useUserStore } from '@/client/store/user-store';
import { AuthService } from '../auth-service';

const UserArea: React.FC = () => {
	const { user, isLoading } = useUserStore();

	const handleSignOut = () => {
		AuthService.logout();
	};

	if (isLoading) {
		return <Skeleton className="h-16 w-full" />;
	}

	if (user) {
		return <AccountPanel key={user.uid} onSignOut={handleSignOut} user={user} />;
	}

	return <GoogleSignInButton />;
};

UserArea.displayName = 'UserArea';

export default UserArea;
