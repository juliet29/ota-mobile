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
  follow: boolean;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ id, follow }) => {
  const [followUser] = useFollowOtherUserMutation();
  console.log("i am going to try to follow this user", follow);

  const submitFollowUser = async () => {
    try {
      const res = await followUser({
        variables: { id, follow },
        refetchQueries: [
          { query: GetOtherUserDocument, variables: { data: { id } } },
        ],
      });
      console.log(res);
    } catch (err) {
      return err;
    }
  };

  return (
    <Button onPress={() => submitFollowUser()}>
      {follow ? "FOLLOW" : "UNFOLLOW"}
    </Button>
  );
};
