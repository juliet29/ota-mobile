import React, { useEffect, useRef } from "react";
import { ToggleButton, Colors } from "react-native-paper";
import {
  useUpdateCommentLikesMutation,
  LikeInput,
  GetCommentsDocument,
} from "../../../generated-components/apolloComponents";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface CommentLikeButtonProps {
  commentId: number;
  postType: string;
  postId: number;
}
type Status = "checked" | "unchecked";
export const CommentLikeButton: React.FC<CommentLikeButtonProps> = ({
  commentId,
  postType,
  postId,
}) => {
  const themeContext = useContext(ThemeContext);
  const [setLikeUnlike] = useUpdateCommentLikesMutation();
  const [status, setStatus] = React.useState("unchecked");

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    console.log(status);
    submitSetLikeUnlike();
  }, [status]);

  const onButtonToggle = (value) => {
    setStatus(status === "unchecked" ? "checked" : "unchecked");
  };

  const submitSetLikeUnlike = async () => {
    let value: boolean = true;
    status === "unchecked" ? (value = false) : value;
    const data: LikeInput = {
      id: commentId,
      value,
    };
    try {
      const response = await setLikeUnlike({
        variables: { data },
        refetchQueries: [
          {
            query: GetCommentsDocument,
            variables: { data: { id: postId, postType } },
          },
        ],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  return (
    <ToggleButton
      icon={status === "unchecked" ? "heart-outline" : "heart"}
      color={themeContext.colors.accent}
      value="heart"
      status={status as Status}
      onPress={onButtonToggle}
    />
  );
};
