import React, { createContext, useState, useEffect, ReactNode, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signin, signout, getToken } from "../services/auth";
import Constants from "expo-constants";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const apiUrl = useMemo(() => {
    console.log("AuthProvider -> ", process.env.API_URL);      
    return Constants.manifest.extra.API_URL ?? Constants.manifest2.extra.API_URL
  }, [])
  
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();
      if (storedToken) setToken(storedToken);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    const newToken = await signin(apiUrl, email, password);
    setToken(newToken);
  };

  const logout = async () => {
    await signout();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
