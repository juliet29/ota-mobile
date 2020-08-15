import React, { useEffect } from "react";
import { Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Caption, Card } from "react-native-paper";
import {
  useGetPostsQuery,
  useGetCurrentUserQuery,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StyledColumnView, LineBreak } from "../../styled-components/ReusedUI";
import { AlbumPostView, ArtistPostView, TrackPostView } from "./PostViews";
import { useStoreActions, useStoreState } from "../../state-management/hooks";
import { useSetUserHook } from "../../modules/authentication/components/useSetUserHook";
import { PollView } from "./PollView";
export const emptyImage =
  "https://www.pikpng.com/pngl/m/39-398340_emergency-medicine-physician-robert-tomsho-empty-profile-picture.png";
export const FeedView: React.FC<HomeStackNavProps<"Feed">> = ({
  navigation,
  route,
}) => {
  const { data, loading, error } = useGetPostsQuery();
  const userState = useStoreState((state) => state.user.user);
  const setCurrentUser = useSetUserHook();
  const pollData = {
    days: 3,
    options: [
      { option: "Yes", votes: 8 },
      { option: "No", votes: 1 },
    ],
    question: "Is Burna Boy's new album worth a listen?",
    length: 2,
    timeSubmitted: "today",
  };

  if (loading) {
    console.log("current user is", userState);
    return <ActivityIndicator />;
  }
  if (error || !data) {
    // console.log(error);
    return <Text>Error..</Text>;
  }

  return (
    <ScrollView>
      <StyledColumnView>
        <Card>
          <Caption>Hello {userState.username}</Caption>
        </Card>
        <LineBreak />
        <StyledColumnView>
          <PollView item={pollData} navigation={navigation} route={route} />
        </StyledColumnView>

        <FlatList
          data={data.getPosts.sort((a, b) =>
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
              ) : (
                <TrackPostView
                  item={item}
                  navigation={navigation}
                  route={route}
                />
              )}
            </StyledColumnView>
          )}
          keyExtractor={(item, ix) => ix.toString()}
        />
      </StyledColumnView>
    </ScrollView>
  );
};
