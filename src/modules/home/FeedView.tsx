import React, { useEffect } from "react";
import { Text, Linking, ImageBackground } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Caption, Card } from "react-native-paper";
import {
  useGetPostsQuery,
  useGetCurrentUserQuery,
  useGetPostsOfFollowingQuery,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StyledColumnView, LineBreak } from "../../styled-components/ReusedUI";
import { AlbumPostView, ArtistPostView, TrackPostView } from "./PostViews";
import { useStoreActions, useStoreState } from "../../state-management/hooks";
import { useSetUserHook } from "../../modules/authentication/components/useSetUserHook";
import { PollView } from "./PollView";
import { PlaylistView } from "./PlaylistView";
import { styles } from "../../styled-components/StyleSheet";

export const openURL = (url: string) => {
  Linking.openURL(url).catch((err) =>
    console.error("An error occurred while opening url", err)
  );
};

export const emptyImage =
  "https://www.pikpng.com/pngl/m/39-398340_emergency-medicine-physician-robert-tomsho-empty-profile-picture.png";

export const FeedView: React.FC<HomeStackNavProps<"Feed">> = ({
  navigation,
  route,
}) => {
  const { data, loading, error } = useGetPostsOfFollowingQuery();
  const userState = useStoreState((state) => state.user.user);
  const setCurrentUser = useSetUserHook();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  console.log("get post query data", data);

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
      <ScrollView>
        <StyledColumnView>
          <Card>
            <Caption>Hello {userState.username}</Caption>
          </Card>
          <LineBreak />
          <StyledColumnView></StyledColumnView>

          <FlatList
            data={data.getPostsOfFollowing.sort((a, b) =>
              b.timeSubmitted.localeCompare(a.timeSubmitted)
            )}
            renderItem={({ item }) => (
              <StyledColumnView>
                {item?.__typename === "ArtistPost" ? (
                  <ArtistPostView
                    item={item}
                    navigation={navigation}
                    route={route}
                  />
                ) : item?.__typename === "AlbumPost" ? (
                  <AlbumPostView
                    item={item}
                    navigation={navigation}
                    route={route}
                  />
                ) : item?.__typename === "TrackPost" ? (
                  <TrackPostView
                    item={item}
                    navigation={navigation}
                    route={route}
                  />
                ) : item?.__typename === "Poll" ? (
                  <PollView item={item} navigation={navigation} route={route} />
                ) : item?.__typename === "Playlist" ? (
                  <PlaylistView
                    item={item}
                    navigation={navigation}
                    route={route}
                  />
                ) : (
                  <></>
                )}
              </StyledColumnView>
            )}
            keyExtractor={(item, ix) => ix.toString()}
          />
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};
