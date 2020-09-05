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
  List,
  Avatar,
  IconButton,
  Subheading,
} from "react-native-paper";
import { Image, Linking, View, Text } from "react-native";
import StarRating from "react-native-star-rating";
import { PostLikeButton } from "./PostLikeButton";
import {
  StyledColumnView,
  IconDescription,
  Row,
  LeftColumn,
  LineBreak,
  ThinLine,
  OrangeCaption,
} from "../../styled-components/ReusedUI";
import { emptyImage, openURL } from "./FeedView";
import { AddToMyListButton } from "../my-list/AddToMyListButton";
import { Colors } from "react-native-paper";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

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
  item: ArtistPost | TrackPost | AlbumPost;
}

export const ContentPostView: React.FC<
  ContentPostProps & HomeStackNavProps<"Feed">
> = ({ item, navigation, route }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Card>
      <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
        {/*************  Content Image  *************/}
        {/* Content Image  TODO: music preview on press */}
        <Image
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />
        <AddToMyListButton postId={+item.id} postType={"artist"} />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            // TODO: evaluate this padding, or just left padding on card content
            paddingLeft: 30,
          }}>
          {/************* User Submission + Time  *************/}
          <LeftColumn>
            {item.user ? (
              <List.Item
                style={{ paddingLeft: 0 }}
                title={item?.user.username}
                titleStyle={{ fontWeight: "bold" }}
                description={item?.timeSubmitted}
                descriptionStyle={{ color: themeContext.colors.accentTwo }}
                onPress={() => {
                  navigation.navigate("UserPage", { id: +item?.user.id });
                }}
                left={(props) => (
                  <Avatar.Image
                    size={50}
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
            ) : (
              <></>
            )}
          </LeftColumn>
          <ThinLine />
          {/* <View
            style={{
              width: "80%",
              backgroundColor: themeContext.colors.darkText,
              height: 0.2,
              marginTop: 20,
              marginBottom: 30,
            }}></View> */}
          {/************* Main Content + Navigate to Content Page *************/}
          <LeftColumn>
            {item.__typename === "AlbumPost" ? (
              <Row>
                <OrangeCaption style={{ bottom: 2 }}>ALBUM</OrangeCaption>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  fullStar={"star"}
                  halfStar={"star-half"}
                  starSize={15}
                  fullStarColor={themeContext.colors.accent}
                  emptyStarColor={themeContext.colors.accent}
                  // iconSet={"react-native-vector-icons"}
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
            ) : null}
            {/* TODO: ON PRESS -> NAV TO ARTIST PAGE -> CHANGE TO BUTTON?  */}
            <Title>
              {item.__typename === "AlbumPost"
                ? item.albumName
                : item.__typename === "TrackPost"
                ? item.trackName
                : item.__typename === "ArtistPost"
                ? item.artistName
                : null}
            </Title>
            <Paragraph>{item?.text}</Paragraph>
          </LeftColumn>
        </View>
        <LineBreak />

        {/************* Links *************/}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          {/* Likes*/}
          <Row>
            <PostLikeButton postType={"artist"} postId={+item.id} />
            <IconDescription>{`${item.likes}`}</IconDescription>
          </Row>

          {/* Comments */}
          <Row>
            <IconButton
              icon="comment-processing-outline"
              color={themeContext.colors.accentTwo}
              size={20}
              onPress={() => {
                navigation.navigate("CommentPage", {
                  postId: +item.id,
                  imageUrl: item.imageUrl,
                  postType:
                    item.__typename === "AlbumPost"
                      ? "album"
                      : item.__typename === "TrackPost"
                      ? "track"
                      : "artist",

                  contentId:
                    item.__typename === "AlbumPost"
                      ? item.albumId
                      : item.__typename === "TrackPost"
                      ? item.trackId
                      : item.artistId,
                  name:
                    item.__typename === "AlbumPost"
                      ? item.albumName
                      : item.__typename === "TrackPost"
                      ? item.trackName
                      : item.artistName,
                });
              }}
            />

            <IconDescription>2</IconDescription>
          </Row>

          {/* Go To Spotify  */}
          <Button
            theme={{ roundness: 0 }}
            style={{ borderBottomRightRadius: 20, paddingTop: 5 }}
            mode="contained"
            icon="play-circle-outline"
            onPress={() => {
              // navigation.navigate("ArtistPage", {
              //   id: item?.artistId,
              //   name: item?.artistName,
              //   imageUrl: item.imageUrl,
              // });
            }}>
            PLAY ON SPOTIFY
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export const ArtistPostView: React.FC<
  ArtistPostProps & HomeStackNavProps<"Feed">
> = ({ item, navigation, route }) => {
  // console.log("artist post", item.user);
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
        <AddToMyListButton postId={+item.id} postType={"artist"} />
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
