import React, { useState, useEffect } from "react";
import { Button, ActivityIndicator } from "react-native-paper";
import {
  useFollowOtherUserMutation,
  useGetOtherUserQuery,
  GetOtherUserDocument,
  GetOtherUserQuery,
  FollowOtherUserMutation,
} from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { ExecutionResult } from "graphql";

interface FollowButtonProps {
  id: number;
  userData: GetOtherUserQuery;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ id, userData }) => {
  const [followUser] = useFollowOtherUserMutation();
  // const [updateUser, setUpdateUser] = useState(false);
  // const [response, setResponse] = useState(undefined);
  // const [alreadyFollowing, setAlreadyFollowing] = useState(undefined);
  const [state, setState] = useState({
    updateUser: false,
    response: undefined,
    alreadyFollowing: false,
  });
  const currentUser = useStoreState((state) => state.user.user);

  // let response: ExecutionResult<FollowOtherUserMutation>;
  let existingFollowers: number[];
  // let alreadyFollowing: boolean = false;

  useEffect(() => {
    console.log("we have response data", state.response);
    if (userData) {
      existingFollowers = state.response
        ? state.response.data.followOtherUser.followers
        : userData.getOtherUser.followers;
      let thisAlreadyFollowing = existingFollowers
        ?.toString()
        .includes(currentUser?.id.toString());
      // setAlreadyFollowing(thisAlreadyFollowing);

      // console.log("data of user to be followed", userData);
      console.log("their followers", existingFollowers, state.alreadyFollowing);
      setState({
        ...state,
        alreadyFollowing: thisAlreadyFollowing,
        updateUser: false,
      });
    }

    // setUpdateUser(false);
  }, [state.updateUser]);

  const submitFollowUser = async (toFollow: boolean) => {
    try {
      let thisResponse = await followUser({
        variables: { id, follow: toFollow },
        refetchQueries: [
          { query: GetOtherUserDocument, variables: { data: { id } } },
        ],
      });
      console.log("this res", thisResponse);
      setState({ ...state, response: thisResponse, updateUser: true });
      // setUpdateUser(true);
      return thisResponse;
    } catch (err) {
      return err;
    }
  };

  return (
    <StyledColumnView>
      {state.alreadyFollowing ? (
        <Button
          onPress={() => {
            submitFollowUser(false);
          }}>
          FOLLOWING
        </Button>
      ) : (
        <Button
          onPress={() => {
            submitFollowUser(true);
          }}>
          FOLLOW
        </Button>
      )}
    </StyledColumnView>
  );
};

//   const submitUnFollowUser = async () => {
//     try {
//       const response = await followUser({
//         variables: { id, follow: false },
//         refetchQueries: [
//           { query: GetOtherUserDocument, variables: { data: { id } } },
//         ],
//       });

//       return response;
//     } catch (err) {
//       return err;
//     }
//   };
