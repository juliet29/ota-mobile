import React from "react";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { useStoreState } from "../../state-management/hooks";
import { Image } from "react-native";
import { StateMapper } from "easy-peasy";

interface ContentPreviewProps {
  //   props: any;
  onPress: (hello: number) => void;
  //   props: boolean;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({ onPress }) => {
  const content = useStoreState((state) => state.createPost.content);
  const postType = useStoreState((state) => state.createPost.postType);

  return (
    <StyledColumnView>
      <Card>
        <Card.Title title={content.name} subtitle={postType} />
        {/* <Image
          style={{ resizeMode: "contain", width: 200, height: 200 }}
          source={{
            uri: `${content.imageUrl}`,
          }}
        /> */}
        <Card.Actions>
          <Button
            onPress={() => {
              //   console.log("button Press!");
              onPress(Math.random());
            }}>
            Cancel
          </Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </StyledColumnView>
  );
};
