import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { DMFeed } from "../../../modules/direct-messages/DMFeed";
import { DMParamList } from "./DMParamList";
import { DMChat } from "../../../modules/direct-messages/DMChat";

interface DMStackProps {}

const Stack = createStackNavigator<DMParamList>();

export const DMStack: React.FC<DMStackProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="DMFeed">
      <Stack.Screen name="DMFeed" component={DMFeed} />
      <Stack.Screen name="DMChat" component={DMChat} />
    </Stack.Navigator>
  );
};
