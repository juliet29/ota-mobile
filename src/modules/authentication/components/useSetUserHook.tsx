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
      console.log("this is my data", data);
      console.log("got that access token tho", userState.accessToken);
    });
  }, [data, loading, error]);

  const setCurrentUser = async () => {
    if (error) {
      console.log("err0 in usesetuserhook straightup", error);
      return false;
    }

    if (!data) {
      console.log("no data in usesetuserhook");
      console.log(data);
      return false;
    }

    if (loading) {
      //
    }

    try {
      const thisData = data.getCurrentUser;

      setUser({
        ...userState,
        id: +thisData.id,
        email: thisData.email,
        username: thisData.username,
        profilePicture: thisData.profilePicture,
        followers: thisData.followers,
        topArtists: thisData.topArtists,
        topAlbums: thisData.topAlbums,
        topTracks: thisData.topTracks,
      });
    } catch (error) {
      console.log("err1 in usesetuserhook function", error);
      return false;
    }
    return true;
  };

  //   setCurrentUser();

  return;
};
