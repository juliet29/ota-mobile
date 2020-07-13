import React from "react";
import { ActivityIndicator, ScrollView, Image } from "react-native";
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
            {
              item?.item.album.images.map((element) => (
                <Image
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                  source={{
                    uri: `${element.url}`,
                  }}
                />
              ))[0]
            }
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

export const ArtistPageAlbums: React.FC<
  ArtistProps & HomeStackNavProps<"ArtistPage">
> = ({ id, navigation, route }) => {
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
            {
              item?.item.images.map((element) => (
                <Image
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                  source={{
                    uri: `${element.url}`,
                  }}
                />
              ))[0]
            }

            <Text>{item.item.name}</Text>
            <Caption>Rating</Caption>
            <Button
              onPress={() => {
                navigation.navigate("AlbumPage", {
                  id: item?.item.id,
                  name: item?.item.name,
                  imageUrl: item?.item.images.map((element) => element.url)[0],
                });
              }}>
              See the Album
            </Button>
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
