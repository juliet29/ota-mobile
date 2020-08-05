import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Caption,
  Card,
  Title,
} from "react-native-paper";
import { TabView } from "react-native-tab-view";
import { useGetOtherUserQuery } from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { LogoutButton } from "../authentication/components/LogoutButton";
import { FollowButton } from "./FollowButton";
import { UserPosts } from "./user-posts/UserPosts";
import { UserTopFiveView } from "./user-top-five/UserTopFiveView";

export const emptyImage =
  "https://www.pikpng.com/pngl/m/39-398340_emergency-medicine-physician-robert-tomsho-empty-profile-picture.png";

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
  const { id } = route.params;
  const { data, loading, error } = useGetOtherUserQuery({
    variables: {
      id,
    },
  });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <UserPosts navigation={navigation} route={route} id={id} />;
      case "second":
        // TODO: take this as a prop from the navigation ...
        return <UserTopFiveView id={id} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    // console.log(error);
    return <></>;
  }

  // const followingOtherUser = data.getOtherUser.followers.includes(userState.id);
  console.log(
    `i am following this user ${data.getOtherUser.followers.includes(
      userState.id
    )}. I know this because their followers are ${
      data.getOtherUser.followers
    } and my id is ${userState.id}`
  );

  // useEffect(() => {
  //   console.log("user to be followed according to userview useeffect", data);
  // }, [data]);

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
              {data.getOtherUser.profilePicture ? (
                <Avatar.Image
                  size={80}
                  source={{
                    uri: `${data.getOtherUser.profilePicture}`,
                  }}
                />
              ) : (
                <Avatar.Icon size={80} icon="account" />
              )}
            </View>

            <View>
              <Title>{data.getOtherUser.username}</Title>
              <Button
                onPress={() => {
                  navigation.navigate("FollowersPage", {
                    id: id,
                    request: "followers",
                  });
                }}>
                FOLLOWERS:{" "}
                {data.getOtherUser.followers
                  ? data.getOtherUser.followers.length
                  : 0}
              </Button>
              <Button
                onPress={() => {
                  navigation.navigate("FollowersPage", {
                    id: id,
                    request: "following",
                  });
                }}>
                FOLLOWING:{" "}
                {data.getOtherUser.following
                  ? data.getOtherUser.following.length
                  : 0}
              </Button>

              <Caption>1 POSTS</Caption>

              {id === userState.id ? (
                <></>
              ) : (
                <FollowButton
                  id={id}
                  follow={
                    data.getOtherUser.followers.includes(userState.id)
                      ? false
                      : true
                  }
                />
              )}

              {id === userState.id ? <LogoutButton /> : <></>}
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
