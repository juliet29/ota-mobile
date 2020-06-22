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
    // check if use is logged in or not
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          // TODO: decode the userString
          console.log("in the use effect");
          login();
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
