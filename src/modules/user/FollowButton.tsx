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
  GetPostsOfFollowingDocument,
} from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { ExecutionResult } from "graphql";
// import { client } from "../..";
import { client } from "../../index";
import { OtherUserData } from "./UserView";

interface FollowButtonProps {
  // id of user that is going to be followed
  id: number;
  follow: boolean;
  setOtherUser: (value: React.SetStateAction<OtherUserData>) => void;
  // submitFollowUser: (id: number, follow: boolean) => Promise<any>;
  // setUpdate: (value: React.SetStateAction<boolean>) => void;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  id,
  follow,
  setOtherUser,
}) => {
  let [followUser, { data: mdata, loading }] = useFollowOtherUserMutation();

  useEffect(() => {
    try {
      const { getOtherUser: cacheData } = client.readQuery<GetOtherUserQuery>({
        query: GetOtherUserDocument,
        variables: {
          id,
        },
      });
      console.log("new cache data in follow", cacheData);
    } catch (err) {
      console.log("no data yet in follow", err);
    }
  });

  const submitFollowUser = async (id: number, follow: boolean) => {
    try {
      let res = await followUser({
        variables: { id, follow },
        refetchQueries: [
          { query: GetOtherUserDocument, variables: { data: { id } } },
          { query: GetPostsOfFollowingDocument },
        ],
      });
      console.log("submit follow button response", res);
      // console.log("submit follow button mutattion data", mdata);
      res.data.followOtherUser
        ? setOtherUser(res.data.followOtherUser)
        : console.log("submitted already folled");
    } catch (err) {
      return err;
    }
  };
  console.log("i am going to try to follow this user", follow);

  return (
    <Button disabled={loading} onPress={() => submitFollowUser(id, follow)}>
      {follow ? "FOLLOW" : "UNFOLLOW"}
    </Button>
  );
};
