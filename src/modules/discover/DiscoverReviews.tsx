import React from "react";
import {
  Caption,
  ActivityIndicator,
  List,
  Avatar,
  Card,
} from "react-native-paper";
import { useGetTopPostsQuery } from "../../generated-components/apolloComponents";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { View, Image } from "react-native";
import { emptyImage } from "../home/FeedView";
import { RoundImage, StyledColumnView } from "../../styled-components/ReusedUI";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";

interface DiscoverReviewsProps {}

export const DiscoverReviews: React.FC<
  DiscoverReviewsProps & HomeStackNavProps<"Feed">
> = ({ navigation }) => {
  const { data, loading, error } = useGetTopPostsQuery();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }
  console.log("top posts", data);

  return (
    <View>
      <ScrollView horizontal={true}>
        <FlatList
          contentContainerStyle={{
            justifyContent: "space-around",
            flexDirection: "row",
          }}
          data={data.getTopPosts}
          keyExtractor={(item, ix) => ix.toString().concat(item.toString())}
          renderItem={({ item }) => (
            <Card
              theme={{ roundness: 10 }}
              style={{
                marginHorizontal: 4,
                paddingVertical: 4,
              }}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}>
                <List.Item
                  style={{ width: 250 }}
                  titleNumberOfLines={2}
                  descriptionNumberOfLines={4}
                  title={
                    item.__typename === "AlbumPost"
                      ? item.albumName
                      : item.__typename === "TrackPost"
                      ? item.trackName
                      : item.__typename === "ArtistPost"
                      ? item.artistName
                      : null
                  }
                  description={item.text}
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
                  left={() => (
                    <RoundImage
                      style={{ width: 70, height: 70, marginLeft: 20 }}
                      resizeMode="contain"
                      source={{
                        uri: `${item.imageUrl}`,
                      }}
                    />
                  )}
                />

                {item.user ? (
                  <List.Item
                    style={{ width: 200, marginLeft: 20 }}
                    title={item?.user.username}
                    titleNumberOfLines={2}
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
                ) : (
                  <></>
                )}
              </View>
            </Card>
          )}
        />
      </ScrollView>
    </View>
  );
};
