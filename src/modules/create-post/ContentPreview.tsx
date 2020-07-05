import React from "react";
import { Image } from "react-native";
import { Button, Card } from "react-native-paper";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView } from "../../styled-components/ReusedUI";

interface ContentPreviewProps {
  onPress: (hello: number) => void;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({ onPress }) => {
  const content = useStoreState((state) => state.createPost.content);
  const postType = useStoreState((state) => state.createPost.postType);

  return (
    <StyledColumnView>
      <Card>
        <Card.Title title={content.name} subtitle={postType} />
        <Image
          style={{ resizeMode: "contain", width: 200, height: 200 }}
          source={{
            uri: `${content.imageUrl}`,
          }}
        />
        <Card.Actions>
          <Button
            onPress={() => {
              // send an alert to CreatePostView to
              // signal user wants to clear content
              // only clear in parent to enable useEffect()
              onPress(Math.random());
            }}>
            Cancel
          </Button>
        </Card.Actions>
      </Card>
    </StyledColumnView>
  );
};
