import React from "react";
import { Text, View, Dimensions } from "react-native";
import { Card, Caption, Title, Button, Avatar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { useStoreState } from "../../state-management/hooks";
import { LogoutButton } from "../authentication/components/LogoutButton";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { UserPosts } from "./user-posts/UserPosts";
import { TabView, SceneMap } from "react-native-tab-view";
import { UserTopFiveView } from "./user-top-five/UserTopFiveView";

interface UserViewProps {}
const initialLayout = { width: Dimensions.get("window").width };

export const UserView: React.FC<HomeStackNavProps<"UserPage">> = ({
  navigation,
  route,
}) => {
  const userState = useStoreState((state) => state.user.user);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Posts" },
    { key: "second", title: "Top Five" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <UserPosts navigation={navigation} route={route} />;
      case "second":
        // TODO: take this as a prop from the navigation ...
        return <UserTopFiveView id={userState.id} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <StyledColumnView>
        <Card>
          <Button
            icon="settings-outline"
            onPress={() => {
              navigation.navigate("SettingsPage");
            }}>
            Settings
          </Button>
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

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </StyledColumnView>
    </ScrollView>
  );
};
