import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState } from './states/user-state';
import { initialUserState } from './states/initial-user-state';
import { User } from '../../common/user';
import { createCustomStorage } from './create-custom-storage';

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initialUserState,
      setUser: (user: User | null) => set({ user }),
      logout: async () => set({ user: initialUserState.user }),
      getUser: () => get().user,
      getUserFromLocalStorage: () => {
        // TODO: Check user stored in local storage

        const user = get().user;

        if (user === null) {
          // TODO: Check user stored in local storage

          console.log('User not found in store, checking local storage');

          const userData = localStorage.getItem('user-storage');
          console.log('User found in local storage:', userData);

          if (userData) {
            const user = JSON.parse(userData);
            console.log('User found in local storage:', user);
            set({ user });
          }
        }

        return user;
      }
    }),
    {
      name: 'user-storage',
      storage: typeof window !== 'undefined' ? createCustomStorage() : undefined,
    }
  )
)