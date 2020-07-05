import React from "react";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { useStoreState } from "../../state-management/hooks";
import { Image } from "react-native";
import { StateMapper } from "easy-peasy";

interface ContentPreviewProps {
  //   props: any;
  onPress: (hello: boolean) => void;
  //   props: boolean;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({ onPress }) => {
  const content = useStoreState((state) => state.createPost.content);
  const postType = useStoreState((state) => state.createPost.postType);

  //   const handleChange = () => {
  //     props.onPress(true)
  //   }
  const tea: string = "tea";
  console.log(onPress);
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
              console.log("button Press!");

              onPress(true);
            }}>
            Cancel
          </Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </StyledColumnView>
  );
};
