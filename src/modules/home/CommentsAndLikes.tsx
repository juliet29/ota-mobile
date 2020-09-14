import React from "react";
import {
  ArtistPost,
  TrackPost,
  AlbumPost,
  Playlist,
  Poll,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { Row, IconDescription } from "../../styled-components/ReusedUI";
import { PostLikeButton } from "./PostLikeButton";
import { IconButton } from "react-native-paper";
import { View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface CommentsAndLikesProps {
  item: ArtistPost | TrackPost | AlbumPost | Playlist | Poll;
}

export const CommentsAndLikes: React.FC<
  CommentsAndLikesProps & HomeStackNavProps<"Feed">
> = ({ item, navigation }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 0,
      }}>
      <Row>
        <PostLikeButton
          postType={
            item.__typename === "AlbumPost"
              ? "album"
              : item.__typename === "TrackPost"
              ? "track"
              : item.__typename === "Playlist"
              ? "playlist"
              : item.__typename === "Poll"
              ? "poll"
              : "artist"
          }
          postId={+item.id}
        />
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
              imageUrl:
                item.__typename === "Playlist"
                  ? item.playlistPicture
                  : item.__typename === "Poll"
                  ? null
                  : item.imageUrl,
              postType:
                item.__typename === "AlbumPost"
                  ? "album"
                  : item.__typename === "TrackPost"
                  ? "track"
                  : item.__typename === "Playlist"
                  ? "playlist"
                  : item.__typename === "Poll"
                  ? "poll"
                  : "artist",

              contentId:
                item.__typename === "AlbumPost"
                  ? item.albumId
                  : item.__typename === "TrackPost"
                  ? item.trackId
                  : item.__typename === "Playlist"
                  ? item.id
                  : item.__typename === "Poll"
                  ? item.id
                  : item.artistId,
              name:
                item.__typename === "AlbumPost"
                  ? item.albumName
                  : item.__typename === "TrackPost"
                  ? item.trackName
                  : item.__typename === "Playlist"
                  ? item.title
                  : item.__typename === "Poll"
                  ? item.question
                  : item.artistName,
            });
          }}
        />

        <IconDescription>2</IconDescription>
      </Row>
    </View>
  );
};
