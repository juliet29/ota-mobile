import React, { useContext } from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import {
  Button,
  Caption,
  Card,
  IconButton,
  Paragraph,
  Text,
  Title,
} from "react-native-paper";
import StarRating from "react-native-star-rating";
import { ThemeContext } from "styled-components";
import {
  AlbumPost,
  ArtistPost,
  Playlist,
  TrackPost,
} from "../../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import {
  OrangeCaption,
  RoundImage,
  Row,
} from "../../../styled-components/ReusedUI";

interface AlbumPostProps {
  item: AlbumPost;
}

interface TrackPostProps {
  item: TrackPost;
}

interface ArtistPostProps {
  item: ArtistPost;
}

interface ContentPostProps {
  item: ArtistPost | TrackPost | AlbumPost | Playlist;
}

export const UserContentPostView: React.FC<
  ContentPostProps & HomeStackNavProps<"UserPage">
> = ({ item, navigation, route }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={{
        marginVertical: 20,
        marginRight: 20,
      }}
      onPress={() => {
        item.__typename === "AlbumPost"
          ? navigation.navigate("AlbumPage", {
              id: item?.albumId,
              name: item?.albumName,
              imageUrl: item.imageUrl,
            })
          : item.__typename === "TrackPost"
          ? navigation.navigate("TrackPage", {
              id: item?.trackId,
              name: item?.trackName,
              artistNames: item?.artistNames,
              imageUrl: item?.imageUrl,
            })
          : item.__typename === "ArtistPost"
          ? navigation.navigate("ArtistPage", {
              id: item?.artistId,
              name: item?.artistName,
              imageUrl: item.imageUrl,
            })
          : item.__typename === "Playlist"
          ? navigation.navigate("PlaylistPage", {
              playlist: item,
            })
          : null;
      }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          // alignContent: "center",

          // marginHorizontal: 10,
        }}>
        <RoundImage
          style={{ width: 130, height: 130 }}
          resizeMode="contain"
          source={{
            uri: `${
              item.__typename === "Playlist"
                ? item.playlistPicture
                : item.imageUrl
            }`,
          }}
        />

        {/* Text */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",

            // alignItems: "flex-start",
            // justifyContent: "flex-start",
            paddingHorizontal: 10,
          }}>
          {item.__typename === "AlbumPost" ? (
            <Row>
              <OrangeCaption style={{ bottom: 2 }}> ALBUM</OrangeCaption>
              <StarRating
                disabled={true}
                maxStars={5}
                fullStar={"star"}
                halfStar={"star-half"}
                starSize={15}
                fullStarColor={themeContext.colors.accent}
                emptyStarColor={themeContext.colors.accent}
                rating={item.rating}
                selectedStar={() => {}}
              />
            </Row>
          ) : item.__typename === "TrackPost" ? (
            <Row>
              <OrangeCaption style={{ top: 7, marginRight: 3 }}>
                TRACK
              </OrangeCaption>
              {item?.vote === 1 ? (
                <IconButton
                  size={15}
                  icon="thumb-up-outline"
                  color={themeContext.colors.accent}
                />
              ) : (
                <IconButton
                  size={15}
                  icon="thumb-down-outline"
                  color={themeContext.colors.accent}
                />
              )}
            </Row>
          ) : item.__typename === "ArtistPost" ? (
            <OrangeCaption>ARTIST</OrangeCaption>
          ) : item.__typename === "Playlist" ? (
            <OrangeCaption>PLAYLIST</OrangeCaption>
          ) : null}

          <Title
            style={{
              paddingRight: 30,
              marginRight: 40,
              fontSize: 17,
            }}>
            {item.__typename === "AlbumPost"
              ? item.albumName
              : item.__typename === "TrackPost"
              ? item.trackName
              : item.__typename === "ArtistPost"
              ? item.artistName
              : item.__typename === "Playlist"
              ? item.title
              : null}
          </Title>
          <Text>
            {item.__typename === "Playlist" ? item.description : item.text}
          </Text>
        </View>
        {/* <List.Item
        title={
          item.__typename === "AlbumPost"
            ? item.albumName
            : item.__typename === "TrackPost"
            ? item.trackName
            : item.__typename === "ArtistPost"
            ? item.artistName
            : item.__typename === "Playlist"
            ? item.title
            : null
        }
        description={
          item.__typename === "Playlist" ? item.description : item.text
        }
        left={() => (
          <View
            style={{
              marginTop: 40,
            }}>
            <RoundImage
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
              source={{
                uri: `${
                  item.__typename === "Playlist"
                    ? item.playlistPicture
                    : item.imageUrl
                }`,
              }}
            />
          </View>
        )}
        onPress={() => {
          item.__typename === "AlbumPost"
            ? navigation.navigate("AlbumPage", {
                id: item?.albumId,
                name: item?.albumName,
                imageUrl: item.imageUrl,
              })
            : item.__typename === "TrackPost"
            ? navigation.navigate("TrackPage", {
                id: item?.trackId,
                name: item?.trackName,
                artistNames: item?.artistNames,
                imageUrl: item?.imageUrl,
              })
            : item.__typename === "ArtistPost"
            ? navigation.navigate("ArtistPage", {
                id: item?.artistId,
                name: item?.artistName,
                imageUrl: item.imageUrl,
              })
            : item.__typename === "Playlist"
            ? navigation.navigate("PlaylistPage", {
                playlist: item,
              })
            : null;
        }}
      /> */}
      </View>
    </TouchableOpacity>
  );
};

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
