import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
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

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();
// more things will go here!!!
export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Feed">
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
      {/* <Stack.Screen name="EditTopFivePage" component={TopFiveSwiper} /> */}
      <Stack.Screen name="CommentPage" component={CommentsView} />
    </Stack.Navigator>
  );
};
