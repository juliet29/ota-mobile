import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { setAccessToken } from "../utils/accessToken";

interface LoginHookProps {}

type useLoginHookType = () => (accessToken: string) => void;

export const useLoginHook: useLoginHookType = () => {
  const { setUser } = useContext(AuthContext);

  const loginUser = (accessToken: string) => {
    setAccessToken(accessToken);
    setUser(accessToken);
  };

  return loginUser;
};
