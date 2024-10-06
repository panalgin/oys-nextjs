import { create } from 'zustand';
import { User } from '@/common/user';

interface UserState {
	user: User | null;
	isLoading: boolean;
	isFetched: boolean;
	setUser: (user: User | null) => void;
	fetchUserDetails: () => Promise<void>;
}

const useUserStore = create<UserState>((set, get) => ({
	user: null,
	isLoading: false,
	isFetched: false,
	setUser: (user: User | null) => {
		set({ user, isFetched: true });
	},
	fetchUserDetails: async () => {
		const state = get();

		if (state.isLoading) {
			return;
		}

		set({ isLoading: true });

		try {
			const response = await fetch('/api/users/me', {
				credentials: 'include', // This ensures cookies are sent with the request
			});
			if (!response.ok) {
				if (response.status === 401) {
					// User is not authenticated
					set({ user: null, isFetched: true, isLoading: false });
					return;
				}
				throw new Error('Failed to fetch user details');
			}
			const userData = await response.json();
			set({ user: userData, isFetched: true, isLoading: false });
		} catch (error) {
			console.error('Error fetching user details:', error);
			set({ isLoading: false });
		}
	},
}));

export default useUserStore;