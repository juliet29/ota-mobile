import React from "react";
import { Button, Modal, Portal, Text } from "react-native-paper";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
import { AddContentToPost } from "./AddContentToPost";
import { useStoreActions } from "../../state-management/hooks";
import { FlatList } from "react-native-gesture-handler";
import { CreatePostNavProps } from "../../navigation/app/create-post/CreatePostParamList";
import { useNavigation } from "@react-navigation/native";

interface CreatePostOptionsProps {}

export const CreatePostOptions: React.FC<CreatePostOptionsProps> = () => {
  const navigation = useNavigation();
  const setPostType = useStoreActions(
    (actions) => actions.createPost.setPostType
  );

  const postTypes = ["track", "artist", "album"];

  return (
    <StyledColumnView>
      <FlatList
        data={postTypes}
        renderItem={(item) => (
          <Button
            onPress={() => {
              navigation.navigate("AddContentToPost");
              setPostType(item.item);
            }}>
            {item.item}
          </Button>
        )}
        keyExtractor={(item) => item}
      />
    </StyledColumnView>
  );
};
