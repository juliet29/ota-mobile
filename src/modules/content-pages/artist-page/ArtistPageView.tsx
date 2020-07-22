import React from "react";
import { ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Headline,
  Subheading,
  Title,
} from "react-native-paper";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { ArtistPageAlbums } from "./ArtistPageAlbums";
import { ArtistPageTracks } from "./ArtistPageTracks";

export const ArtistPageView: React.FC<HomeStackNavProps<"ArtistPage">> = ({
  route,
  navigation,
}) => {
  const { id, name, imageUrl } = route.params;

  return (
    <ScrollView>
      <StyledColumnView>
        <Card>
          <Card.Content style={{ alignItems: "center" }}>
            <Avatar.Image size={80} source={{ uri: `${imageUrl}` }} />
            <Title>{name}</Title>
            <Subheading>10 Followers</Subheading>
            <Button>Follow</Button>
          </Card.Content>
        </Card>
      </StyledColumnView>

      <StyledColumnView>
        <Headline>Top Songs</Headline>
        <ArtistPageTracks id={id} />
      </StyledColumnView>

      <StyledColumnView>
        <Headline>Albums</Headline>
        <ArtistPageAlbums id={id} navigation={navigation} route={route} />
      </StyledColumnView>

      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("ArtistPosts", {
            id: id,
            name: name,
          });
        }}>
        See Shares of this Artist
      </Button>
    </ScrollView>
  );
};
