import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import { Center } from "../global-ui/Center";
import { Button, Text } from "react-native";
import { AuthContext } from "../AuthProvider";
import { LoginView } from "../modules/LoginView";
import { RegisterView } from "../modules/RegisterView";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="Login">
      {/* TODO: remove these headerTitles */}
      <Stack.Screen
        options={{ headerTitle: "Sign In" }}
        name="Login"
        component={LoginView}
      />
      <Stack.Screen
        options={{ headerTitle: "Sign Up" }}
        name="Register"
        component={RegisterView}
      />
    </Stack.Navigator>
  );
};
