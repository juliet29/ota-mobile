import React from "react";
import { Image, ActivityIndicator } from "react-native";
import { Wrapper, StyledColumnView } from "../../styled-components/ReusedUI";
import {
  Subheading,
  Button,
  Title,
  Caption,
  Card,
  Text,
  Headline,
} from "react-native-paper";
import {
  HomeParamList,
  HomeStackNavProps,
} from "../../navigation/app/home/HomeParamList";
import {
  useGetArtistTopTracksQuery,
  Maybe,
  ArtistTopTrackItem,
  Artist,
  Image as ImageType,
  GetArtistTopTracksQuery,
} from "../../generated-components/apolloComponents";
import { FlatList } from "react-native-gesture-handler";
interface ArtistPageViewProps {}

type ArtistItem = { __typename?: "ArtistTopTrackItem" } & Pick<
  ArtistTopTrackItem,
  "name" | "preview_url"
> & {
    artists?: Maybe<
      Array<Maybe<{ __typename?: "Artist" } & Pick<Artist, "name">>>
    >;
    album?: Maybe<
      { __typename?: "Album" } & {
        images?: Maybe<
          Array<Maybe<{ __typename?: "Image" } & Pick<ImageType, "url">>>
        >;
      }
    >;
  };

export interface ArtistFlatList {
  tracks: GetArtistTopTracksQuery[];
}

export const ArtistPageView: React.FC<HomeStackNavProps<"ArtistPage">> = ({
  route,
  navigation,
}) => {
  const { artistId } = route.params;
  const { data, loading, error } = useGetArtistTopTracksQuery({
    variables: {
      id: artistId,
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  console.log(data);

  return (
    <Wrapper>
      <StyledColumnView>
        <Card.Content style={{ alignItems: "center" }}>
          <Image
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <Title>Artist Name</Title>
          <Subheading>10 Followers</Subheading>
          <Button>Follow</Button>
        </Card.Content>
      </StyledColumnView>
      <StyledColumnView>
        <Headline>Top Songs</Headline>

        <FlatList
          data={data.getArtistTopTracks.tracks!}
          renderItem={(item) => (
            <Card>
              <Card.Content style={{ alignItems: "center" }}>
                <Text>{item.item.name}</Text>
                <Caption>Song Title</Caption>
                <Button>Play</Button>
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item, ix) => ix.toString()}
        />
        {/* flatlist : { item: ArtistItem } */}
      </StyledColumnView>

      <StyledColumnView>
        {/* flatlist */}
        <Headline>Albums</Headline>
        <Card>
          <Card.Content style={{ alignItems: "center" }}>
            <Text>Album Name</Text>
            <Caption>Rating</Caption>
            <Button>Play</Button>
          </Card.Content>
        </Card>
      </StyledColumnView>

      <Button>See Shares of this Artist</Button>
    </Wrapper>
  );
};
