import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Title, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlbumPageView } from "../../../modules/content-pages/AlbumPageView";
import { ArtistPageView } from "../../../modules/content-pages/artist-page/ArtistPageView";
import { ArtistPostsView } from "../../../modules/content-pages/ArtistPostsView";
import { TrackPageView } from "../../../modules/content-pages/TrackPageView";
import { CommentsView } from "../../../modules/home/comments/CommentsView";
import { FeedView } from "../../../modules/home/FeedView";
import { SearchButton } from "../../../modules/search/SearchButton";
import { SearchView } from "../../../modules/search/SearchView";
import { SettingsView } from "../../../modules/user/user-settings/SettingsView";
import { UserButton } from "../../../modules/user/UserButton";
import { UserView } from "../../../modules/user/UserView";
import { HomeParamList } from "./HomeParamList";
import { Followers } from "../../../modules/user/Followers";
import { UserOnBoarding } from "../../../modules/user/user-settings/UserOnBoarding";
import {
  GetCurrentUserDocument,
  GetCurrentUserQuery,
  useGetCurrentUserQuery,
} from "../../../generated-components/apolloComponents";
import { client } from "../../../index";
import { useStoreState } from "../../../state-management/hooks";
import { useSetUserHook } from "../../../modules/authentication/components/useSetUserHook";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();
// more things will go here!!!
export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const userState = useStoreState((state) => state.user.user);
  const setCurrentUser = useSetUserHook();
  // const userData = client.readQuery<GetCurrentUserQuery>({
  //   query: GetCurrentUserDocument,
  // });

  if (!userState || !userState.username) {
    console.log("no user data in cache yest", userState);

    return <ActivityIndicator />;
  }

  console.log("first login?", userState.firstLogin);

  return (
    <Stack.Navigator
      initialRouteName={userState.firstLogin ? "UserOnBoarding" : "Feed"}>
      {/* initialRouteName="UserOnBoarding"> */}
      <Stack.Screen
        name="Feed"
        options={{
          header: ({ scene, previous, navigation }) => {
            return (
              <SafeAreaView>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <Title>On the Aux</Title>
                  <UserButton navigation={navigation} />
                  <SearchButton navigation={navigation} />
                  {/* <LogoutButton /> */}
                </View>
              </SafeAreaView>
            );
          },
        }}
        component={FeedView}
      />
      <Stack.Screen name="ArtistPage" component={ArtistPageView} />
      <Stack.Screen name="ArtistPosts" component={ArtistPostsView} />
      <Stack.Screen name="AlbumPage" component={AlbumPageView} />
      <Stack.Screen name="TrackPage" component={TrackPageView} />
      <Stack.Screen name="UserPage" component={UserView} />
      <Stack.Screen name="SearchPage" component={SearchView} />
      <Stack.Screen name="SettingsPage" component={SettingsView} />
      <Stack.Screen name="CommentPage" component={CommentsView} />
      <Stack.Screen name="FollowersPage" component={Followers} />
      {/* TODO: hide tabs on this view later  */}
      <Stack.Screen name="UserOnBoarding" component={UserOnBoarding} />
    </Stack.Navigator>
  );
};
