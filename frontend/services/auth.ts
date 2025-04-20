import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataContext } from "@/providers/DataProvider";
import { AsyncStore, SecureStore } from "@/stores/global.store";

export interface AppUser {
  email: string;
  token: string;
}

export const signin = async (apiUrl: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/users/signin`, {email, password});
    const token = response.data.token;
    
    if (!token) {
      throw new Error("Token not found");
    }

    // await SecureStore.save<AppUser>("USER", {
    await AsyncStore.save<AppUser>("USER_DATA", {
        email: email,
        token: token
    });
    localStorage.setItem('authToken', token);
    return token;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const signout = async () => {
  console.log("SignOut...................");  
  await AsyncStore.delete("USER_DATA")
  localStorage.removeItem('authToken');
};

export const getToken = async () => { 
  // const credentials =  await AsyncStore.get<AppUser>("USER_DATA");
  // console.log("getToken -> ", credentials?.token);
  // return credentials?.token;

  return localStorage.getItem('authToken');
};
