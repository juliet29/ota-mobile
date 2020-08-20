import React from "react";
import { Caption, ActivityIndicator, List, Avatar } from "react-native-paper";
import { useGetTopPostsQuery } from "../../generated-components/apolloComponents";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { View, Image } from "react-native";
import { emptyImage } from "../home/FeedView";
import { StyledColumnView } from "../../styled-components/ReusedUI";

interface DiscoverReviewsProps {}

export const DiscoverReviews: React.FC<DiscoverReviewsProps> = ({}) => {
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
    <ScrollView horizontal={true}>
      <View>
        <FlatList
          contentContainerStyle={{
            justifyContent: "space-around",
            flexDirection: "row",
          }}
          data={data.getTopPosts}
          keyExtractor={(item, ix) => ix.toString().concat(item.toString())}
          renderItem={({ item }) => (
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
                description={
                  item.__typename === "AlbumPost"
                    ? item.text
                    : item.__typename === "TrackPost"
                    ? item.text
                    : item.__typename === "ArtistPost"
                    ? item.text
                    : null
                }
                left={() => (
                  <Image
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
                  // description={item?.user.username}
                  //   onPress={() => {
                  //     navigation.navigate("UserPage", { id: +item?.user.id });
                  //   }}
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
          )}
        />
      </View>
    </ScrollView>
  );
};

// const imageType = (type: string, item: any) => {
//   if (type === "ArtistPost") {
//     return (
//       <Image
//         style={{ width: 100, height: 100, marginLeft: 20 }}
//         resizeMode="contain"
//         source={{
//           uri: `${item.imageUrl}`,
//         }}
//       />
//     );
//   }
//   if (type === "AlbumPost") {
//     return (
//       <Image
//         style={{ width: 100, height: 100, marginLeft: 20 }}
//         resizeMode="contain"
//         source={{
//           uri: `${item.imageUrl}`,
//         }}
//       />
//     );
//   }

//   if (type === "TrackPost") {
//     return (
//       <Image
//         style={{ width: 100, height: 100, marginLeft: 20 }}
//         resizeMode="contain"
//         source={{
//           uri: `${item.imageUrl}`,
//         }}
//       />
//     );
//   }
// };
