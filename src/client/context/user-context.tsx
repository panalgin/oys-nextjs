'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User } from "@/common/user";

interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	fetchUserDetails: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	const fetchUserDetails = useCallback(async () => {
		const uid = localStorage.getItem('userUid');
		if (uid) {
			const response = await fetch('/api/users/me', {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const userData = await response.json();
			setUser(userData);
		}
	}, []);

	useEffect(() => {
		fetchUserDetails();
	}, [fetchUserDetails]);

	return (
		<UserContext.Provider value={{ user, setUser, fetchUserDetails }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}

	return context;
};