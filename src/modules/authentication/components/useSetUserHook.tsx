import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../../../generated-components/apolloComponents";
import {
  useStoreActions,
  useStoreState,
} from "../../../state-management/hooks";

interface LoginHookProps {}

type useSetUserHookType = () => void;

export const useSetUserHook: useSetUserHookType = () => {
  //   const { setUser } = useContext(AuthContext);
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const userState = useStoreState((state) => state.user.user);
  const { data, loading, error } = useGetCurrentUserQuery();

  useEffect(() => {
    setCurrentUser().then((x) => {
      console.log("in set userhook, hope this is true", x);
    });
    console.log("set user use effect");
  }, [data]);
  //   console.log("just called user", data);

  //   console.log("i got big data", data);

  const setCurrentUser = async () => {
    if (error) {
      console.log("error getting user", error);
      return false;
    }

    if (!data) {
      console.log("no data", data);
      return false;
    }

    if (loading) {
      //
    }

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

  //   setCurrentUser();

  return;
};
