import React from "react";
import { Button, IconButton } from "react-native-paper";
import {
  MyListInput,
  MyListItem,
  useAddToMyListMutation,
  GetMyListDocument,
} from "../../generated-components/apolloComponents";

// type AddToMyListButtonProps = MyListItem

export const AddToMyListButton: React.FC<MyListItem> = ({
  postId,
  postType,
}) => {
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
      icon="playlist-plus"
      onPress={submitAddToMyList}
    />
  );
};
