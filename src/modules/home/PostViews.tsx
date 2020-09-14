import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Avatar,
  Button,
  Caption,
  Card,
  IconButton,
  List,
  Paragraph,
  Title,
} from "react-native-paper";
import StarRating from "react-native-star-rating";
import { ThemeContext } from "styled-components";
import {
  AlbumPost,
  ArtistPost,
  Playlist,
  TrackPost,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import {
  LeftColumn,
  LineBreak,
  OrangeCaption,
  Row,
  SimpleColumn,
  StyledColumnView,
  ThinLine,
} from "../../styled-components/ReusedUI";
import { AddToMyListButton } from "../my-list/AddToMyListButton";
import { CommentsAndLikes } from "./CommentsAndLikes";
import { emptyImage, openURL } from "./FeedView";
import { PostLikeButton } from "./PostLikeButton";

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

export const ContentPostView: React.FC<
  ContentPostProps & HomeStackNavProps<"Feed">
> = ({ item, navigation, route }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Card style={{ marginBottom: 20 }} theme={{ roundness: 15 }}>
      <Card.Content
        style={{
          paddingHorizontal: 0,
          paddingVertical: 0,
          paddingLeft: 20,
        }}>
        {/*************  Content Image + Add to My List  *************/}
        {/* Content Image  TODO: music preview on press */}
        <Row style={{ justifyContent: "space-around", paddingRight: 10 }}>
          <View
            style={{
              // TODO: modify for android
              shadowColor: themeContext.colors.primary,
              shadowOffset: { width: 0.5, height: 5 },
              shadowOpacity: 0.3,
            }}>
            <Image
              style={{
                width: 260,
                height: 260,
                left: -30,
                top: -40,
                borderRadius: 7,
              }}
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
          <AddToMyListButton
            postId={+item.id}
            postType={
              item.__typename === "AlbumPost"
                ? "album"
                : item.__typename === "TrackPost"
                ? "track"
                : item.__typename === "ArtistPost"
                ? "artist"
                : "playlist"
            }
          />
        </Row>

        <SimpleColumn>
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

          {/************* Main Content + Navigate to Content Page *************/}
          <TouchableOpacity
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
              ) : item.__typename === "Playlist" ? (
                <OrangeCaption>PLAYLIST</OrangeCaption>
              ) : null}

              <Title>
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
              <Paragraph style={{ color: themeContext.colors.darkText }}>
                {item.__typename === "Playlist" ? item.description : item.text}
              </Paragraph>
            </LeftColumn>
          </TouchableOpacity>
        </SimpleColumn>
        <LineBreak />

        {/************* Links *************/}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          {/* Comments & Likes*/}
          <CommentsAndLikes navigation={navigation} item={item} route={route} />

          {/* Go To Spotify  */}
          {item.__typename === "Playlist" ? (
            <></>
          ) : (
            <Button
              theme={{ roundness: 0 }}
              style={{ borderBottomRightRadius: 12, paddingTop: 5 }}
              mode="contained"
              icon="play-circle-outline"
              onPress={() => {
                openURL(`${item.externalUrl}`);
              }}>
              PLAY ON SPOTIFY
            </Button>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

/*
 *
 *
 *
 *
 *
 *
 *
 */

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
