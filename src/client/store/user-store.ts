import { create } from 'zustand';
import { User } from '@/common/user';
import { useEffect, cache } from 'react';

interface UserState {
	user: User | null;
	isLoading: boolean;
	isFetched: boolean;
	setUser: (user: User | null) => void;
	fetchUserDetails: () => Promise<void>;
}

const useUserStore = create<UserState, []>(
	((set, get) => ({
		user: null,
		isLoading: false,
		isFetched: false,
		setUser: (user: User | null) => {
			if (user === null) {
				localStorage.removeItem('userUid');
			}
			console.log('Setting user:', user);
			set({ user: user as User, isFetched: true });
		},
		fetchUserDetails: cache(async () => {
			const state = get();

			if (state.isLoading) {
				return;
			}

			set({ isLoading: true });		

			const uid = localStorage.getItem('userUid');
			
			if (uid) {
				try {
					const response = await fetch('/api/users/me', {
						headers: {
							'Content-Type': 'application/json',
							'X-User-Uid': uid,
						},
					});
					if (!response.ok) {
						throw new Error('Failed to fetch user details');
					}
					const userData = await response.json();
					set({ user: userData, isFetched: true, isLoading: false });
				} catch (error) {
					console.error('Error fetching user details:', error);
					set({ isLoading: false });
				}
			} else {
				set({ isLoading: false, isFetched: true });
			}
		}),
	}))
);

const useUser = () => {
	const { user, isLoading, isFetched, setUser, fetchUserDetails } = useUserStore();

	useEffect(() => {
		if (!isLoading && !isFetched) {
			fetchUserDetails();
		}
	}, [isLoading, isFetched, fetchUserDetails]);

	return { user, isLoading, isFetched, setUser, fetchUserDetails };
};

export default useUser;