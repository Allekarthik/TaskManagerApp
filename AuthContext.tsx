import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login session on app start
  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('userLoggedIn');
      if (user) setIsLoggedIn(true);
    };
    checkLogin();
  }, []);

  const login = async () => {
    await AsyncStorage.setItem('userLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
