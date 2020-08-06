import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  ActivityIndicator,
  ToggleButton,
  Colors,
} from "react-native-paper";
import {
  useFollowOtherUserMutation,
  useGetOtherUserQuery,
  GetOtherUserDocument,
  GetOtherUserQuery,
  FollowOtherUserMutation,
  LikeInput,
  GetCommentsDocument,
} from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { ExecutionResult } from "graphql";

interface FollowButtonProps {
  // id of user that is going to be followed
  id: number;
  userData: GetOtherUserQuery;
}

type Status = "checked" | "unchecked";
export const FollowButton: React.FC<FollowButtonProps> = ({ id, userData }) => {
  const [followUser] = useFollowOtherUserMutation();
  // const [updateUser, setUpdateUser] = useState(false);
  // const [response, setResponse] = useState(undefined);
  // const [alreadyFollowing, setAlreadyFollowing] = useState(undefined);
  // const [state, setState] = useState({
  //   updateUser: false,
  //   response: undefined,
  //   alreadyFollowing: false,
  // });
  const currentUser = useStoreState((state) => state.user.user);
  // get wether user is currently following or not
  let initialStatus = "unchecked";
  let existingFollowers = userData?.getOtherUser.followers;
  // useEffect(() => {
  if (existingFollowers) {
    initialStatus =
      existingFollowers.indexOf(currentUser.id) == -1 ? "unchecked" : "checked";
  }
  // }, []);

  const [status, setStatus] = React.useState(initialStatus);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    console.log("my status", status);
    submitFollowUser();
  }, [status]);

  const onButtonToggle = (value) => {
    // see of we are following the user or not
    console.log("userdata", userData);
    console.log("existing follows and me", existingFollowers, currentUser.id);
    existingFollowers
      ? console.log(
          "am i following?",
          existingFollowers.indexOf(currentUser.id)
        )
      : console.log("no follows");
    console.log(status);

    setStatus(status === "unchecked" ? "checked" : "unchecked");
  };

  const submitFollowUser = async () => {
    console.log("submitting follow user");
    let value: boolean = false;
    status === "unchecked" ? (value = true) : value;
    try {
      let res = await followUser({
        variables: { id, follow: value },
        refetchQueries: [
          { query: GetOtherUserDocument, variables: { data: { id } } },
        ],
      });
      console.log("res", res);
    } catch (err) {
      return err;
    }
  };

  return (
    <ToggleButton
      icon="account-arrow-right"
      color={status === "unchecked" ? Colors.blue300 : Colors.grey300}
      value="follow"
      status={status as Status}
      onPress={onButtonToggle}
    />
  );
};
