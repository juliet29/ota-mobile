import React from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Avatar,
  Button,
  Caption,
  Card,
  Headline,
  Subheading,
  Text,
  Title,
} from "react-native-paper";
import {
  useGetArtistAlbumsQuery,
  useGetArtistTopTracksQuery,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../styled-components/ReusedUI";

interface ArtistProps {
  id: string;
}

export const ArtistPageTracks: React.FC<ArtistProps> = ({ id }) => {
  const { data, loading, error } = useGetArtistTopTracksQuery({
    variables: {
      id: id,
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  return (
    <FlatList
      data={data.getArtistTopTracks.tracks!}
      renderItem={(item) => (
        <Card>
          <Card.Content style={{ alignItems: "center" }}>
            <Subheading style={{ textAlign: "center" }}>
              {item.item.name}
            </Subheading>
            {item.item.artists.map((element, ix) => (
              <Caption key={ix}>{element.name}</Caption>
            ))}
            <Button>Play</Button>
          </Card.Content>
        </Card>
      )}
      keyExtractor={(item, ix) => ix.toString()}
    />
  );
};

export const ArtistPageAlbums: React.FC<ArtistProps> = ({ id }) => {
  const { data, loading, error } = useGetArtistAlbumsQuery({
    variables: {
      id: id,
    },
  });
  console.log(data);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  if (data.getArtistAlbums.items.length < 1) {
    return (
      <Card>
        <Caption style={{ textAlign: "center" }}>
          This Artist has no albums
        </Caption>
      </Card>
    );
  }

  return (
    <FlatList
      data={data.getArtistAlbums.items}
      renderItem={(item) => (
        <Card>
          <Card.Content style={{ alignItems: "center" }}>
            <Text>{item.item.name}</Text>
            <Caption>Rating</Caption>
            <Button>Play</Button>
          </Card.Content>
        </Card>
      )}
      keyExtractor={(item, ix) => ix.toString()}
    />
  );
};

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
        <ArtistPageAlbums id={id} />
      </StyledColumnView>

      <Button mode="contained">See Shares of this Artist</Button>
    </ScrollView>
  );
};
