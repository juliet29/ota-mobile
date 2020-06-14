import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./AppParamList";
import { TabActions } from "@react-navigation/native";
import { HomeStack } from "./home/HomeStack";
import { CreatePostStack } from "./create-post/CreatePostStack";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="CreatePost" component={CreatePostStack} />
    </Tabs.Navigator>
  );
};
