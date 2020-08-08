import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { RootStack } from "../navigation/app/RootStack";
import { AuthStack } from "../navigation/auth/AuthStack";
import { useStoreState } from "../state-management/hooks";
import { Center } from "../styled-components/Center";
import { getAccessToken } from "./accessToken";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  // const { user } = useContext(AuthContext);
  // console.log(`my context is ${user}`);
  const user = useStoreState((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  // let accessToken = getAccessToken();

  useEffect(() => {
    // check if user is logged in or not --> not doing anything rn
    let accessToken = getAccessToken();
    // console.log("easy-peasy user from routes: ", user);
    if (accessToken) {
      // console.log("user is logged in");
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
      {/* {user.accessToken ? <RootStack /> : <AuthStack />} */}
      {user.accessToken ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
