import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LogoutButton } from "../../../modules/authentication/components/LogoutButton";
import { ArtistPageView } from "../../../modules/content-pages/artist-page/ArtistPageView";
import { ArtistPostsView } from "../../../modules/content-pages/ArtistPostsView";
import { FeedView } from "../../../modules/home/FeedView";
import { HomeParamList } from "./HomeParamList";
import { AlbumPageView } from "../../../modules/content-pages/AlbumPageView";
import { TrackPageView } from "../../../modules/content-pages/TrackPageView";
import { UserView } from "../../../modules/user/UserView";
import { View } from "react-native";
import { UserButton } from "../../../modules/user/UserButton";
import { Caption, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchView } from "../../../modules/search/SearchView";
import { SearchButton } from "../../../modules/search/SearchButton";
import { SettingsView } from "../../../modules/user/user-settings/SettingsView";
import { TopFiveSwiper } from "../../../modules/user/user-settings/settings-top-five/TopFiveSwiper";

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
      <Stack.Screen name="EditTopFivePage" component={TopFiveSwiper} />
    </Stack.Navigator>
  );
};
