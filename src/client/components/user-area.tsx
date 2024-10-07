import React from 'react';
import AccountPanel from './account-panel';
import { GoogleSignInButton } from './google-sign-in-button';
import { UserService } from '../services/user-service';
import Skeleton from './ui/skeleton';
import { User } from '../../common/user';

interface UserAreaProps {
	user: User | null;
	isLoading: boolean;
}

const UserArea = React.memo(({ user, isLoading }: UserAreaProps) => {
	const handleSignOut = () => {
		UserService.logout();
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
});

UserArea.displayName = 'UserArea';

export default UserArea;
