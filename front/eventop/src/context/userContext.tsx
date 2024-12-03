"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

interface UserContextProps {
  role: string | null;
  setRole: (role: string | null) => void;
  userName: string | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {

    const token = JSON.parse(Cookies.get('accessToken') || '{}');
    console.log('Token:', token);
    if (token) {
      try {
        const decodedToken: any = jwt.decode(token);
        console.log('Decoded token:', decodedToken);
        const role = decodedToken['role'];
        console.log('Roles:', role);
        if (role) {
          setRole(role); // Asumimos que el primer rol es el principal
        }
        const userName = decodedToken['username'];
        console.log('Username:', userName);
        if (userName) {
          setUserName(userName);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ role, setRole, userName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};