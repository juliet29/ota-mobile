import React, { useEffect } from "react";
import { Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Caption, Card } from "react-native-paper";
import {
  useGetPostsQuery,
  useGetCurrentUserQuery,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { AlbumPostView, ArtistPostView, TrackPostView } from "./PostViews";
import { useStoreActions, useStoreState } from "../../state-management/hooks";
import { useSetUserHook } from "../../modules/authentication/components/useSetUserHook";

export const FeedView: React.FC<HomeStackNavProps<"Feed">> = ({
  navigation,
  route,
}) => {
  const { data, loading, error } = useGetPostsQuery();
  const userState = useStoreState((state) => state.user.user);
  const setCurrentUser = useSetUserHook();

  if (loading) {
    console.log("current user is", userState);
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  return (
    <ScrollView>
      <StyledColumnView>
        <Card>
          <Caption>Hello {userState.username}</Caption>
        </Card>
        <FlatList
          data={data.getPosts}
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
