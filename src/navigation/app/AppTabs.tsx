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
import { MyList } from "./my-list/MyList";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
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
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}>
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="Discover" component={DiscoverStack} />
      <Tabs.Screen name="CreatePost" component={CreatePostStack} />
      <Tabs.Screen name="MyList" component={MyList} />
      <Tabs.Screen name="DirectMessages" component={DirectMessagesStack} />
    </Tabs.Navigator>
  );
};
