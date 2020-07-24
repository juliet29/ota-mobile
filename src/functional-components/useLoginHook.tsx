import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { setAccessToken } from "../utils/accessToken";
import { useStoreActions } from "../state-management/hooks";
import { State } from "react-native-gesture-handler";
import userModel, {
  UserTypeInterface,
} from "../state-management/model/userModel";
import { useSetUserHook } from "./useSetUserHook";

interface LoginHookProps {}

type useLoginHookType = () => [
  (accessToken: string, userData?: UserTypeInterface) => void,
  () => void
];

export const useLoginHook: useLoginHookType = () => {
  //   const { setUser } = useContext(AuthContext);
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const clearUser = useStoreActions((actions) => actions.user.clearUser);
  // const setCurrentUser = useSetUserHook();

  const setLoginUser = (myToken: string, userData?: UserTypeInterface) => {
    setAccessToken(myToken);
    const payload = userData
      ? {
          accesToken: myToken,
          id: userData.id,
          email: userData.email,
          username: userData.username,
        }
      : { accessToken: myToken };
    console.log("my payload", payload);
    setUser(payload);
    // setUser(accessToken);
    // setCurrentUser();
  };

  const setLogoutUser = () => {
    setAccessToken("");
    clearUser();
    // setUser(accessToken);
  };

  return [setLoginUser, setLogoutUser];
};
