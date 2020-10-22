import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./AppParamList";
import { TabActions } from "@react-navigation/native";
import { HomeStack } from "./home/HomeStack";
import { CreatePostStack } from "./create-post/CreatePostStack";
import {
  DiscoverStack,
  MyListStack,
  DirectMessagesStack,
} from "./other/OtherStack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { AddContentToPost } from "../../modules/create-post/AddContentToPost";
import { MyList } from "../../modules/my-list/MyList";
import { Discover } from "../../modules/discover/Discover";
import { DMFeed } from "../../modules/direct-messages/DMFeed";
import { DMStack } from "./direct-messages/DMStack";
import { UserButton } from "../../modules/user/UserButton";
import { SearchButton } from "../../modules/search/SearchButton";
import { View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "CreatePost") {
            iconName = focused ? "ios-list-box" : "ios-list";
          } else if (route.name === "MyList") {
            iconName = focused ? "ios-bookmark" : "ios-bookmarks";
          } else if (route.name === "Discover") {
            iconName = focused ? "ios-star-outline" : "ios-star";
          } else if (route.name === "DirectMessages") {
            iconName = focused ? "ios-chatboxes" : "ios-chatbubbles";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: themeContext.colors.accent,
        inactiveTintColor: themeContext.colors.darkText,
        activeBackgroundColor: themeContext.colors.background,
        inactiveBackgroundColor: themeContext.colors.background,
        tabStyle: {
          backgroundColor: themeContext.colors.background,
          height: 80,
          paddingBottom: 20,
        },
      }}>
      <Tabs.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen name="Discover" component={Discover} />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePostStack}
        options={{
          tabBarLabel: "Create Post",
        }}
      />
      <Tabs.Screen
        name="MyList"
        component={MyList}
        options={{
          tabBarLabel: "My List",
        }}
      />
      <Tabs.Screen
        name="DirectMessages"
        component={DMStack}
        options={{
          tabBarLabel: "DMs",
        }}
      />
    </Tabs.Navigator>
  );
};
