import React from "react";
import {
  AlbumPost,
  User,
  TrackPost,
  ArtistPost,
} from "../../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import {
  Card,
  Caption,
  Title,
  Paragraph,
  Button,
  Text,
  List,
  Avatar,
} from "react-native-paper";
import { Image, Linking, View } from "react-native";
import StarRating from "react-native-star-rating";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { emptyImage } from "../../home/FeedView";
import { PostLikeButton } from "../../home/PostLikeButton";

interface AlbumPostProps {
  item: AlbumPost;
}

interface TrackPostProps {
  item: TrackPost;
}

interface ArtistPostProps {
  item: ArtistPost;
}

export const ArtistPostView: React.FC<
  ArtistPostProps & HomeStackNavProps<"UserPage">
> = ({ item, navigation, route }) => {
  return (
    <Card>
      {/* TODO: make a global style for centering */}
      <Card.Content style={{ alignItems: "center" }}>
        <Image
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />

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
  AlbumPostProps & HomeStackNavProps<"UserPage">
> = ({ item, navigation, route }) => {
  return (
    <Card>
      {/* TODO: make a global style for centering */}
      <Card.Content style={{ alignItems: "center" }}>
        <Image
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />

        <Caption>ALBUM</Caption>
        {/* <StarRating disabled={true} rating={item?.rating} /> */}
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
  TrackPostProps & HomeStackNavProps<"UserPage">
> = ({ item, navigation, route }) => {
  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred while opening url", err)
    );
  };
  return (
    <Card>
      <Card.Content style={{ alignItems: "center" }}>
        {/* TODO: make a global style for centering */}

        <Image
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />

        <Caption>TRACK</Caption>
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
          }}>
          SEE TRACK ON SPOTIFY
        </Button>
      </Card.Content>
    </Card>
  );
};
