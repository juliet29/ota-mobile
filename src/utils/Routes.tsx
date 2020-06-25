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
import { getAccessToken } from "./accessToken";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext);

  const accessToken = getAccessToken();
  return (
    <NavigationContainer>
      {accessToken ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
