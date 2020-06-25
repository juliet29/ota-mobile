import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppTabs } from "../navigation/app/AppTabs";
import { AuthStack } from "../navigation/auth/AuthStack";
import { getAccessToken } from "./accessToken";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const accessToken = getAccessToken();
  return (
    <NavigationContainer>
      {accessToken ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
