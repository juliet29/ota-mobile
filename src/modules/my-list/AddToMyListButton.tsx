import React from "react";
import { Button, IconButton } from "react-native-paper";
import {
  MyListInput,
  MyListItem,
  useAddToMyListMutation,
  GetMyListDocument,
} from "../../generated-components/apolloComponents";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

// type AddToMyListButtonProps = MyListItem

export const AddToMyListButton: React.FC<MyListItem> = ({
  postId,
  postType,
}) => {
  const themeContext = useContext(ThemeContext);
  const [addToMyList, { loading }] = useAddToMyListMutation();

  const submitAddToMyList = async () => {
    const data: MyListInput = {
      postId,
      postType,
    };

    try {
      const response = await addToMyList({
        variables: { data },
        refetchQueries: [{ query: GetMyListDocument }],
      });
      console.log("add response", response);
      return response;
    } catch (err) {
      return err;
    }
  };

  return (
    <IconButton
      disabled={loading}
      color={themeContext.colors.primary}
      icon="playlist-plus"
      size={30}
      onPress={submitAddToMyList}
    />
  );
};
