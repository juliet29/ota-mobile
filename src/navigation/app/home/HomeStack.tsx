import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LogoutButton } from "../../../functional-components/LogoutButton";
import { ArtistPageView } from "../../../modules/content-pages/ArtistPageView";
import { ArtistPostsView } from "../../../modules/content-pages/ArtistPostsView";
import { FeedView } from "../../../modules/home/FeedView";
import { HomeParamList } from "./HomeParamList";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();
// more things will go here!!!
export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      {/* {addProductRoutes(Stack)} */}
      <Stack.Screen
        name="Feed"
        options={{
          headerRight: () => {
            return <LogoutButton />;
          },
        }}
        component={FeedView}
      />
      <Stack.Screen name="ArtistPage" component={ArtistPageView} />
      <Stack.Screen name="ArtistPosts" component={ArtistPostsView} />
    </Stack.Navigator>
  );
};
