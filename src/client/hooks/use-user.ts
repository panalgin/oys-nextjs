import { useUserStore } from '@/client/store/user-store';
import { useEffect, useState } from 'react';

export function useUser() {
  const { user, isLoading } = useUserStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsReady(true);
    }
  }, [isLoading]);

  if (!isReady) {
    throw new Promise((resolve) => setTimeout(resolve, 0));
  }

  return user;
}