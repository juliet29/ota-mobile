import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { useStoreActions } from "../../state-management/hooks";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface CreatePostOptionsProps {}

export const CreatePostOptions: React.FC<CreatePostOptionsProps> = () => {
  const navigation = useNavigation();
  const setPostType = useStoreActions(
    (actions) => actions.createPost.setPostType
  );

  const themeContext = useContext(ThemeContext);
  const postTypes = ["track", "artist", "album", "poll", "playlist"];

  return (
    <StyledColumnView>
      <FlatList
        data={postTypes}
        renderItem={(item) => (
          <Button
            labelStyle={{ color: themeContext.colors.accentTwo }}
            onPress={() => {
              if (item.item == "poll") {
                navigation.navigate("CreatePoll");
              } else if (item.item == "playlist") {
                navigation.navigate("CreatePlaylist");
              } else {
                setPostType(item.item);
                navigation.navigate("AddContentToPost");
              }
            }}>
            {item.item}
          </Button>
        )}
        keyExtractor={(item) => item}
      />
    </StyledColumnView>
  );
};
