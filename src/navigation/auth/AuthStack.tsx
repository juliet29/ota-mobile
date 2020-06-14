import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginView } from "../../modules/LoginView";
import { RegisterView } from "../../modules/RegisterView";
import { AuthParamList } from "./AuthParamList";

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
