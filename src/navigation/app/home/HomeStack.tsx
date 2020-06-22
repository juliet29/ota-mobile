import React, { useContext } from "react";
import { Text, Button, FlatList } from "react-native";
import { FeedView } from "../../../modules/FeedView";
import { HomeStackNavProps, HomeParamList } from "./HomeParamList";
import { StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../../utils/AuthProvider";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();
// more things will go here!!!
export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Feed">
      {/* {addProductRoutes(Stack)} */}
      <Stack.Screen
        name="Feed"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}>
                <Text>Logout</Text>
              </TouchableOpacity>
            );
          },
        }}
        component={FeedView}
      />
    </Stack.Navigator>
  );
};
