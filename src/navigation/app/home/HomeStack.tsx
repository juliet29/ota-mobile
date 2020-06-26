import React, { useContext } from "react";
import { Text, Button, FlatList } from "react-native";
import { FeedView } from "../../../modules/FeedView";
import { HomeStackNavProps, HomeParamList } from "./HomeParamList";
import { StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../../utils/AuthProvider";
import { LogoutButton } from "../../../functional-components/LogoutButton";

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
    </Stack.Navigator>
  );
};
