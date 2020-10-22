import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, ImageBackground } from "react-native";
import { ActivityIndicator, Title, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSetUserHook } from "../../../modules/authentication/components/useSetUserHook";
import { AlbumPageView } from "../../../modules/content-pages/AlbumPageView";
import { ArtistPageView } from "../../../modules/content-pages/artist-page/ArtistPageView";
import { PlaylistPageView } from "../../../modules/content-pages/artist-page/PlaylistPageView";
import { ArtistPostsView } from "../../../modules/content-pages/ArtistPostsView";
import { TrackPageView } from "../../../modules/content-pages/TrackPageView";
import { CommentsView } from "../../../modules/home/comments/CommentsView";
import { FeedView } from "../../../modules/home/FeedView";
import { SearchButton } from "../../../modules/search/SearchButton";
import { SearchView } from "../../../modules/search/SearchView";
import { Followers } from "../../../modules/user/Followers";
import { SettingsView } from "../../../modules/user/user-settings/SettingsView";
import { UserOnBoarding } from "../../../modules/user/user-settings/UserOnBoarding";
import { UserButton } from "../../../modules/user/UserButton";
import { UserView } from "../../../modules/user/UserView";
import { useStoreState } from "../../../state-management/hooks";
import { HomeParamList } from "./HomeParamList";
import { styles } from "../../../styled-components/StyleSheet";
import { blueA800 } from "../../../styled-components/colors";
import { Header } from "../header/Header";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();
// more things will go here!!!
export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const { colors } = useTheme();
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
      initialRouteName={userState.firstLogin ? "UserOnBoarding" : "Feed"}
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return <Header navigation={navigation} title={title} />;
        },
      }}>
      <Stack.Screen
        name="Feed"
        // options={{
        //   header: ({ scene, previous, navigation }) => {
        //     return <Header navigation={navigation} />;
        //   },
        // }}
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
      <Stack.Screen name="PlaylistPage" component={PlaylistPageView} />
    </Stack.Navigator>
  );
};
