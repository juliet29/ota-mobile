import React from "react";
import { Image, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  Paragraph,
  Title,
} from "react-native-paper";
import {
  AlbumPost,
  ArtistPost,
  TrackPost,
  useGetPostsQuery,
  User,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../styled-components/ReusedUI";

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
            navigation.navigate("ArtistPage", {
              id: item?.artistId,
              name: item?.artistName,
              imageUrl: item.imageUrl,
            });
          }}>
          SEE ARTIST
        </Button>
      </Card.Content>
    </Card>
  );
};

export const AlbumPostView: React.FC<
  AlbumPostProps & HomeStackNavProps<"Feed">
> = ({ item, navigation, route }) => {
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
        <Title>{item?.albumName}</Title>
        <Paragraph>{item?.text}</Paragraph>
        <Button
          mode="contained"
          onPress={() => {
            console.log("album button");
            navigation.navigate("AlbumPage", {
              id: item?.albumId,
              name: item?.albumName,
              imageUrl: item.imageUrl,
            });
          }}>
          SEE ALBUM
        </Button>
      </Card.Content>
    </Card>
  );
};

export const TrackPostView: React.FC<
  TrackPostProps & HomeStackNavProps<"Feed">
> = ({ item, navigation, route }) => {
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
        <Title>{item?.trackName}</Title>
        <Paragraph>{item?.text}</Paragraph>
        <Button
          mode="contained"
          onPress={() => {
            console.log("track button");
            // navigation.navigate("ArtistPage", {
            //   id: item?.artistId,
            //   name: item?.artistName,
            //   imageUrl: item.imageUrl,
            // });
          }}>
          SEE TRACK
        </Button>
      </Card.Content>
    </Card>
  );
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
            <ArtistPostView item={item} navigation={navigation} route={route} />
          ) : item?.__typename === "AlbumPost" ? (
            <AlbumPostView item={item} navigation={navigation} route={route} />
          ) : (
            <TrackPostView item={item} navigation={navigation} route={route} />
          )}
        </StyledColumnView>
      )}
      keyExtractor={(item, ix) => ix.toString()}
    />
  );
};
