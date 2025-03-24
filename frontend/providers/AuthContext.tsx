import React, { createContext, useState, useEffect, ReactNode, useMemo, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signin, signout, getToken } from "../services/auth";
import Constants from "expo-constants";
import { useDataContext } from "./DataProvider";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType >({ token: null, login: async () => {}, logout: () => {}});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null); 

  const apiUrl = useMemo(() => {
    console.log("AuthProvider -> ", process.env.API_URL);      
    return Constants.manifest.extra.API_URL ?? Constants.manifest2.extra.API_URL
  }, [])
  
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken); 
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    const newToken = await signin(apiUrl, email, password);
    setToken(newToken); 
  };

  const logout = async () => {
    setToken(null); 
    await signout();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);