import React from "react";
import {
  StyledColumnView,
  CommentTextInput,
  Row,
} from "../../../styled-components/ReusedUI";
import { TextInput, IconButton, Avatar } from "react-native-paper";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import {
  useCreateCommentMutation,
  CommentInput,
  GetPostsDocument,
  GetCommentsDocument,
  useGetCommentsQuery,
} from "../../../generated-components/apolloComponents";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface AddCommentProps {
  imageUrl: string;
}

export const AddComment: React.FC<
  AddCommentProps & HomeStackNavProps<"CommentPage">
> = ({ navigation, route, imageUrl }) => {
  const themeContext = useContext(ThemeContext);
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
        refetchQueries: [
          { query: GetCommentsDocument, variables: { data: { id, postType } } },
        ],
      });
      setText("");
      return response;
    } catch (err) {
      return err;
    }
  };

  return (
    <Row
      style={{
        justifyContent: "space-around",
        alignContent: "center",
        marginTop: 20,
      }}>
      <Avatar.Image
        size={24}
        source={{
          uri: `${imageUrl}`,
        }}
      />
      <CommentTextInput
        placeholder="Leave your comment..."
        placeholderTextColor={themeContext.colors.darkText}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <IconButton
        style={{ marginTop: -4 }}
        icon="send"
        onPress={submitCreateComment}
      />
    </Row>
  );
};
