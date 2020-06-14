import React, { useContext } from "react";
import { Center } from "../../../global-ui/Center";
import { Text, Button, FlatList } from "react-native";
import faker from "faker";
import { HomeStackNavProps, HomeParamList } from "./HomeParamList";
import { StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../../AuthProvider";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

function Feed({ navigation }: HomeStackNavProps<"Feed">) {
  return (
    <Center>
      <FlatList
        style={{ width: "100%" }}
        renderItem={({ item }) => {
          return (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate("Post", {
                  name: item,
                });
              }}
            />
          );
        }}
        //   TODO: figue out the issue with the key exractor
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
}

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
        component={Feed}
      />
    </Stack.Navigator>
  );
};
