import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import { Center } from "./Center";
import { Button, Text } from "react-native";
import { AuthContext } from "./AuthProvider";
import { LoginView } from "./LoginView";
import { RegisterView } from "./RegisterView";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <Text>LOGIN!</Text>
      <Button
        title="log me in"
        onPress={() => {
          login();
        }}
      />
      <Button
        title="go to register"
          onPress={() => {
          navigation.navigate("Register")
        }}
      />
    </Center>
  );
}

function Register({ navigation, route }: AuthNavProps<"Register">) {
  return (
    <Center>
      <Text>route name: {route.name}</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </Center>
  );
}

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
