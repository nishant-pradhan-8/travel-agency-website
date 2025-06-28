import { BookingHistory, FormData, info, SharedProps } from '@/types/types';
import { useForm, usePage } from '@inertiajs/react';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AppContextType {
  
  APP_URL: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const APP_URL:string = 'http://localhost:8000';
 

  return (
    <AppContext.Provider value={{ APP_URL }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {

  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
