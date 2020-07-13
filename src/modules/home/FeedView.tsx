import React from "react";
import { Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Card,
  Paragraph,
  Subheading,
  Title,
  Caption,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import {
  useGetPostsQuery,
  User,
  ArtistPost,
  AlbumPost,
  TrackPost,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";

interface AlbumPostProps {
  item: {
    __typename?: "AlbumPost";
  } & Pick<
    AlbumPost,
    | "text"
    | "artistNames"
    | "rating"
    | "imageUrl"
    | "timeSubmitted"
    | "albumId"
    | "albumName"
  > & {
      user?: {
        __typename?: "User";
      } & Pick<User, "username">;
    };
}

interface TrackPostProps {
  item: {
    __typename?: "TrackPost";
  } & Pick<
    TrackPost,
    | "text"
    | "imageUrl"
    | "timeSubmitted"
    | "artistNames"
    | "vote"
    | "trackId"
    | "trackName"
  > & {
      user?: {
        __typename?: "User";
      } & Pick<User, "username">;
    };
}

interface ArtistPostProps {
  item: {
    __typename?: "ArtistPost";
  } & Pick<
    ArtistPost,
    "text" | "imageUrl" | "timeSubmitted" | "artistId" | "artistName"
  > & {
      user?: {
        __typename?: "User";
      } & Pick<User, "username">;
    };
}

export const ArtistPostView: React.FC<
  ArtistPostProps & HomeStackNavProps<"Feed">
> = ({ item, navigation, route }) => {
  // const navigation = useNavigation<()
  return (
    <Card>
      {/* TODO: make a global style for centering */}
      <Card.Content style={{ alignItems: "center" }}>
        <Image
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />
        <Caption>{item?.user?.username}</Caption>
        <Text>{item?.timeSubmitted}</Text>
        <Caption>ARTIST</Caption>
        <Title>{item?.artistName}</Title>
        <Paragraph>{item?.text}</Paragraph>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("ArtistPage", { artistId: item?.artistId });
          }}>
          SEE ARTIST
        </Button>
      </Card.Content>
    </Card>
  );
};

export const AlbumPostView: React.FC<AlbumPostProps> = ({ item }) => {
  return <Text>AlbumPost</Text>;
};

export const TrackPostView: React.FC<TrackPostProps> = ({ item }) => {
  return <Text>TrackPost</Text>;
};

export const FeedView: React.FC<HomeStackNavProps<"Feed">> = ({
  navigation,
  route,
}) => {
  const { data, loading, error } = useGetPostsQuery();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  return (
    <FlatList
      data={data.getPosts}
      renderItem={({ item }) => (
        <StyledColumnView>
          {item?.__typename === "ArtistPost" ? (
            <ArtistPostView navigation={navigation} item={item} route={route} />
          ) : item?.__typename === "AlbumPost" ? (
            <AlbumPostView item={item} />
          ) : (
            <TrackPostView item={item} />
          )}
        </StyledColumnView>
      )}
      keyExtractor={(item, ix) => ix.toString()}
    />
  );
};
