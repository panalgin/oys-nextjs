import { createContext, useContext } from 'react';
import { UserService } from '../services/user-service';

export type Services = {
  userService: UserService
}

export const ServicesContext = createContext<Services | null>(null);

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};