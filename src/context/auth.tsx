import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import * as AuthSession from "expo-auth-session";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUp(credentials: User): Promise<void>;
  signOut(): void;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const userStorageKey = "@mobile:user";

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=605338352093-c56ssqf0q9pp5ka7s8bmq3dvc8duhsn2.apps.googleusercontent.com&redirect_uri=https://auth.expo.io/@vanessashirlenee/assault_alert&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();
        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        };
        setUser(userLogged);

        await AsyncStorage.setItem(
          "@mobile:user",
          JSON.stringify(userLogged)
        );
      }
    } catch (error) {
      throw new Error("error");
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem("@mobile:user");
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const data = await AsyncStorage.getItem("@mobile:user");
      const parsedData = data ? (JSON.parse(data) as User) : ({} as User);

      setUser(parsedData);
      setIsLoadingUserData(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOut,
        isLoadingUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
