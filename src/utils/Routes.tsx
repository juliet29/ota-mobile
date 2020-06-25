import React, { useEffect, useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  Text,
  Button,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { Center } from "../styled-components/Center";
import { AuthNavProps, AuthParamList } from "../navigation/auth/AuthParamList";
import { AuthStack } from "../navigation/auth/AuthStack";
import { AuthContext } from "./AuthProvider";
import { AppTabs } from "../navigation/app/AppTabs";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if user is logged in or not
    // TODO: revise this with new state management system
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          // TODO: actually get user from new state management
          console.log("checking if user is logged in");

          login({ email: "fakeEmail", password: "fakePassword" }, true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }
  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
