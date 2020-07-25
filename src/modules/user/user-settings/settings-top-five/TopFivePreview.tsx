import React from "react";
import { Card, Caption, Title, Button } from "react-native-paper";
import { TopFiveArrayType } from "./TopFiveSwiper";
import { FlatList } from "react-native-gesture-handler";
import { StyledColumnView } from "../../../../styled-components/ReusedUI";
import { isTypeNode } from "graphql";
import { View } from "react-native";

interface TopFivePreviewProps {
  artists: TopFiveArrayType[];
  tracks: TopFiveArrayType[];
  albums: TopFiveArrayType[];
}

export const TopFivePreview: React.FC<TopFivePreviewProps> = ({
  artists,
  tracks,
  albums,
}) => {
  return (
    <StyledColumnView>
      <Card>
        <Title>Favorite Artists</Title>
        <FlatList
          data={artists}
          keyExtractor={(item, index) => item!?.id!?.toString() + index}
          renderItem={({ item }) => <Caption>{item.name}</Caption>}
        />
      </Card>

      <Card>
        <Title>Favorite Albums</Title>
        <FlatList
          data={albums}
          keyExtractor={(item, index) => item!?.id!?.toString() + index}
          renderItem={({ item }) => <Caption>{item.name}</Caption>}
        />
      </Card>

      <Card>
        <Title>Favorite Tracks</Title>
        <FlatList
          data={tracks}
          keyExtractor={(item, index) => item!?.id!?.toString() + index}
          renderItem={({ item }) => <Caption>{item.name}</Caption>}
        />
      </Card>
      <Button
        onPress={() => {
          console.log("save faves");
        }}>
        SAVE
      </Button>
    </StyledColumnView>
  );
};
