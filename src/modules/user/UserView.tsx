import React from "react";
import { Text, View } from "react-native";
import { Card, Caption, Title, Button, Avatar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { useStoreState } from "../../state-management/hooks";
import { LogoutButton } from "../authentication/components/LogoutButton";
import { UserPosts } from "./components/UserPosts";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";

interface UserViewProps {}

export const UserView: React.FC<HomeStackNavProps<"UserPage">> = ({
  navigation,
  route,
}) => {
  const userState = useStoreState((state) => state.user.user);
  return (
    <ScrollView>
      <StyledColumnView>
        <Card>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}>
            <View>
              <Avatar.Icon size={80} icon="account" />
            </View>

            <View>
              <Title>{userState.username}</Title>
              <Caption>1 FOLLOWERS</Caption>
              <Caption>1 POSTS</Caption>
              <Button>FOLLOW</Button>
              <LogoutButton />
            </View>
          </View>
        </Card>
        <StyledColumnView>
          <Card>
            <Caption>Now playing on Spotify/ Apple Music</Caption>
          </Card>
        </StyledColumnView>

        <UserPosts navigation={navigation} route={route} />
      </StyledColumnView>
    </ScrollView>
  );
};
