import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { setAccessToken } from "../utils/accessToken";
import { useStoreActions, useStoreState } from "../state-management/hooks";
import { State } from "react-native-gesture-handler";
import userModel, {
  UserTypeInterface,
} from "../state-management/model/userModel";
import { useGetCurrentUserQuery } from "../generated-components/apolloComponents";

interface LoginHookProps {}

type useSetUserHookType = () => () => Promise<boolean>;

export const useSetUserHook: useSetUserHookType = () => {
  //   const { setUser } = useContext(AuthContext);
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const userState = useStoreState((state) => state.user.user);
  const {
    data: data,
    loading: loading,
    error: error,
  } = useGetCurrentUserQuery();

  //   console.log("i got big data", data);

  const setCurrentUser = async () => {
    console.log("i got BIGer data", data);

    try {
      const thisData = data.getCurrentUser;
      console.log("raw data", thisData);
      const userId = thisData.facebookId ? thisData.facebookId : thisData.id;
      setUser({
        ...userState,
        email: thisData.email,
        username: thisData.username,
        id: userId,
      });
    } catch (error) {
      console.log("errerrrr in data", error);
      return false;
    }
    return true;
  };

  return setCurrentUser;
};
