import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginView } from "../../modules/authentication/LoginView";
import { RegisterView } from "../../modules/authentication/RegisterView";
import { AuthParamList } from "./AuthParamList";
import { LoginFailed } from "../../modules/authentication/LoginFailed";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="Login">
      {/* TODO: remove these headerTitles */}
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
      <Stack.Screen name="LoginFailed" component={LoginFailed} />
      {/* <Stack.Screen name="RegisterFailed" component={RegisterView} /> */}
    </Stack.Navigator>
  );
};
