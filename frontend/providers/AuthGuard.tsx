import { useContext, useEffect } from "react"; 
import { router } from "expo-router";
import { AuthContext } from "./AuthContext";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth || !auth.token) {
      router.replace("/sign-in");
    } else {
      router.replace("/(tabs)");
    }
  }, [auth?.token]);

  return <>{children}</>;
};

export default AuthGuard;
