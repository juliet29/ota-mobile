import React from "react";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { TextInput, IconButton } from "react-native-paper";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import {
  useCreateCommentMutation,
  CommentInput,
  GetPostsDocument,
  GetCommentsDocument,
} from "../../../generated-components/apolloComponents";

interface AddCommentProps {}

export const AddComment: React.FC<HomeStackNavProps<"CommentPage">> = ({
  navigation,
  route,
}) => {
  const [text, setText] = React.useState("");
  const [createComment] = useCreateCommentMutation();
  const { postId: id, postType } = route.params;
  console.log(id, postType);

  const submitCreateComment = async () => {
    const data: CommentInput = {
      text,
      id,
      postType,
    };
    try {
      const response = await createComment({
        variables: { data },
        // TODO: fix this query issue
        refetchQueries: [{ query: GetCommentsDocument }],
      });
      setText("");
      return response;
    } catch (err) {
      return err;
    }
  };

  return (
    <StyledColumnView>
      <TextInput
        label="Add a Comment"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <IconButton icon="send" onPress={submitCreateComment} />
    </StyledColumnView>
  );
};
