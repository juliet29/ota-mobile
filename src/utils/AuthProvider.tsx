import React, { useReducer, useState } from "react";
import { AsyncStorage } from "react-native";
import {
  useLoginMutation,
  LoginMutationVariables,
} from "../generated-components/apolloComponents";
import { Card, Title } from "react-native-paper";
import { LoginFailed } from "../modules/LoginFailed";
import { setAccessToken } from "./accessToken";

type User = null | { username: string };

export const AuthContext = React.createContext<{
  user: User;
  login: (
    { email, password }: LoginMutationVariables,
    alreadyHere: boolean
  ) => any;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: ({ email, password }, alreadyHere) => {},
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem("user");
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
