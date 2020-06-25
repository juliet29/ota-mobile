import React, { useReducer, useState } from "react";
import { AsyncStorage } from "react-native";
import {
  useLoginMutation,
  LoginMutationVariables,
} from "../generated-components/apolloComponents";
import { Card, Title } from "react-native-paper";
import { LoginFailed } from "../modules/LoginFailed";

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

  const [loginUser, { loading, error }] = useLoginMutation();

  async function submitLoginUser(
    { email, password }: LoginMutationVariables,
    alreadyHere: boolean
  ) {
    if (!alreadyHere) {
      try {
        const response = await loginUser({ variables: { email, password } });
        console.log(response);
        if (response.data?.login === null) {
          console.log("user not found ");
          return null;
        }
        // TODO: throw user not found error on backend
      } catch (err) {
        console.log(err);
      }
    }

    const fakeUser = { username: "bob" };
    setUser(fakeUser);
    AsyncStorage.setItem("user", JSON.stringify(fakeUser));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login: ({ email, password }, alreadyHere) => {
          submitLoginUser({ email, password }, alreadyHere);
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem("user");
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
