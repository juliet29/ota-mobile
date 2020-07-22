import React from "react";
import { Image, Text, Linking } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Caption,
  Card,
  Paragraph,
  Title,
  Button,
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
import StarRating from "react-native-star-rating";

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
    | "externalUrl"
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
    | "externalUrl"
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
    | "text"
    | "imageUrl"
    | "timeSubmitted"
    | "artistId"
    | "artistName"
    | "externalUrl"
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
        <Caption>ALBUM</Caption>
        <StarRating disabled={true} rating={item?.rating} />
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
  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred while opening url", err)
    );
  };
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
        <Caption>TRACK</Caption>
        {item?.vote === 1 ? (
          <Button icon="thumb-up-outline" disabled={true}>
            {" "}
          </Button>
        ) : (
          <Button icon="thumb-down-outline" disabled={true}>
            {" "}
          </Button>
        )}
        <Button
          onPress={() => {
            navigation.navigate("TrackPage", {
              id: item?.trackId,
              name: item?.trackName,
              artistNames: item?.artistNames,
              imageUrl: item?.imageUrl,
            });
          }}>
          <Title>{item?.trackName}</Title>
        </Button>

        <Paragraph>{item?.text}</Paragraph>
        <Button
          mode="contained"
          onPress={() => {
            console.log(item.externalUrl);

            openURL(`${item.externalUrl}`);
            // navigation.navigate("ArtistPage", {
            //   id: item?.artistId,
            //   name: item?.artistName,

            // });
          }}>
          SEE TRACK ON SPOTIFY
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
