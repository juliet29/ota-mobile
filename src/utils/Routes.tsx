import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { AppTabs } from "../navigation/app/AppTabs";
import { AuthStack } from "../navigation/auth/AuthStack";
import { Center } from "../styled-components/Center";
import { getAccessToken } from "./accessToken";
import { AuthContext } from "./AuthProvider";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user } = useContext(AuthContext);
  console.log(`my context is ${user}`);
  const [loading, setLoading] = useState(true);
  // let accessToken = getAccessToken();

  useEffect(() => {
    // check if user is logged in or not
    let accessToken = getAccessToken();
    console.log(accessToken);
    if (accessToken) {
      console.log("user is logged in");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }
  // const accessToken = getAccessToken();
  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
