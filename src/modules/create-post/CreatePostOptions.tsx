import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { useStoreActions } from "../../state-management/hooks";
import { StyledColumnView } from "../../styled-components/ReusedUI";

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
