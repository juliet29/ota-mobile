import React from "react";
import {
  AlbumPost,
  User,
  TrackPost,
  ArtistPost,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
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
import { Image, Linking } from "react-native";
import StarRating from "react-native-star-rating";
import { PostLikeButton } from "./PostLikeButton";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { emptyImage, openURL } from "./FeedView";
import { AddToMyListButton } from "../my-list/AddToMyListButton";

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
  ArtistPostProps & HomeStackNavProps<"Feed">
> = ({ item, navigation, route }) => {
  // console.log("artist post", item.user);
  return (
    <Card>
      {/* TODO: make a global style for centering */}
      <Card.Content style={{ alignItems: "center" }}>
        <AddToMyListButton postId={+item.id} postType={"artist"} />
        <Image
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />
        {item.user ? (
          <StyledColumnView>
            {/* <Caption>{item.user.username}</Caption> */}
            <List.Item
              title={item?.user.username}
              // description={item?.user.username}
              onPress={() => {
                navigation.navigate("UserPage", { id: +item?.user.id });
              }}
              left={(props) => (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: `${
                      item?.user.profilePicture
                        ? item?.user.profilePicture
                        : emptyImage
                    }`,
                  }}
                />
              )}
            />
          </StyledColumnView>
        ) : (
          <></>
        )}

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
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("CommentPage", {
              postId: +item.id,
              postType: "artist",
              contentId: item?.artistId,
              name: item?.artistName,
              imageUrl: item.imageUrl,
            });
          }}>
          SEE COMMENTS
        </Button>
        <PostLikeButton postType={"artist"} postId={+item.id} />
        <Paragraph>{`Likes: ${item.likes}`}</Paragraph>
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
        <AddToMyListButton postId={+item.id} postType={"album"} />
        <Image
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />

        {item.user ? (
          <StyledColumnView>
            <Caption>{item.user.username}</Caption>
            <List.Item
              title={item?.user.username}
              description={item?.user.username}
              onPress={() => {
                navigation.navigate("UserPage", { id: +item?.user.id });
              }}
              left={(props) => (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: `${
                      item?.user.profilePicture
                        ? item?.user.profilePicture
                        : emptyImage
                    }`,
                  }}
                />
              )}
            />
          </StyledColumnView>
        ) : (
          <></>
        )}

        <Text>{item?.timeSubmitted}</Text>
        <Caption>ALBUM</Caption>
        {/* <StarRating disabled={true} rating={item?.rating} /> */}
        <Title>{item?.albumName}</Title>
        <Paragraph>{item?.text}</Paragraph>
        <Button
          mode="contained"
          onPress={() => {
            // console.log("album button");
            navigation.navigate("AlbumPage", {
              id: item?.albumId,
              name: item?.albumName,
              imageUrl: item.imageUrl,
            });
          }}>
          SEE ALBUM
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("CommentPage", {
              postId: +item.id,
              postType: "album",
              contentId: item?.albumId,
              name: item?.albumName,
              imageUrl: item.imageUrl,
            });
          }}>
          SEE COMMENTS
        </Button>
        <PostLikeButton postType={"album"} postId={+item.id} />
        <Paragraph>{`Likes: ${item.likes}`}</Paragraph>
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
        <AddToMyListButton postId={+item.id} postType={"track"} />
        <Image
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />
        {item.user ? (
          <StyledColumnView>
            <Caption>{item.user.username}</Caption>
            <List.Item
              title={item?.user.username}
              description={item?.user.username}
              onPress={() => {
                navigation.navigate("UserPage", { id: +item?.user.id });
              }}
              left={(props) => (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: `${
                      item?.user.profilePicture
                        ? item?.user.profilePicture
                        : emptyImage
                    }`,
                  }}
                />
              )}
            />
          </StyledColumnView>
        ) : (
          <></>
        )}
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
            // console.log(item.externalUrl);

            openURL(`${item.externalUrl}`);
            // navigation.navigate("ArtistPage", {
            //   id: item?.artistId,
            //   name: item?.artistName,

            // });
          }}>
          SEE TRACK ON SPOTIFY
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("CommentPage", {
              postId: +item.id,
              postType: "track",
              contentId: item?.trackId,
              name: item?.trackName,
              imageUrl: item.imageUrl,
            });
          }}>
          SEE COMMENTS
        </Button>
        <PostLikeButton postType={"track"} postId={+item.id} />
        <Paragraph>{`Likes: ${item.likes}`}</Paragraph>
      </Card.Content>
    </Card>
  );
};
