import React, { ReactNode } from 'react';
import { ServicesContext, Services } from './services.context';

interface ServicesProviderProps {
  services: Services;
  children: ReactNode;
}

export function ServicesProvider ({ services, children }) {
  return (
    <Services>
      {children}
    </.Provider>
  );
};