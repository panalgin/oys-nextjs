import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState } from './states/user-state';
import { initialUserState } from './states/initial-user-state';
import { User } from '../../common/user';
import { createCustomStorage } from './create-custom-storage';
import { auth } from '../firebase';

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialUserState,
      setUser: (user: User | null) => set({ user }),
      logout: async () => {
        await auth.signOut();
        set({ user: initialUserState.user });
        localStorage.removeItem('user-storage');
      },
    }),
    {
      name: 'user-storage',
      storage: typeof window !== 'undefined' ? createCustomStorage() : undefined,
    }
  )
)