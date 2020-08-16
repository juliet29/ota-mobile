import React from "react";
import {
  Title,
  Card,
  Caption,
  List,
  Avatar,
  Paragraph,
  Button,
} from "react-native-paper";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { Playlist } from "../../generated-components/apolloComponents";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { emptyImage } from "./FeedView";
import { PostLikeButton } from "./PostLikeButton";
import { Image, Text } from "react-native";

interface PlaylistViewProps {
  item: Playlist;
}

export const PlaylistView: React.FC<
  PlaylistViewProps & HomeStackNavProps<"Feed">
> = ({ item, navigation, route }) => {
  return (
    <Card>
      {/* TODO: make a global style for centering */}
      <Card.Content style={{ alignItems: "center" }}>
        <Image
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
          source={{
            uri: `${item.playlistPicture}`,
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
        <Caption>PLAYLIST</Caption>
        <Title>{item?.title}</Title>
        <Paragraph>{item?.description}</Paragraph>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("PlaylistPage", {
              playlist: item,
            });
          }}>
          SEE PLAYLIST
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("CommentPage", {
              postId: +item.id,
              postType: "playlist",
              contentId: item?.id,
              name: item?.title,
              imageUrl: item.playlistPicture,
            });
          }}>
          SEE COMMENTS
        </Button>
        <PostLikeButton postType={"playlist"} postId={+item.id} />
        <Paragraph>{`Likes: ${item.likes}`}</Paragraph>
      </Card.Content>
    </Card>
  );
};
