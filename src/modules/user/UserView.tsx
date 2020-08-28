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
import {
  useGetOtherUserQuery,
  GetOtherUserDocument,
  useFollowOtherUserMutation,
  GetOtherUserQuery,
  User,
  Maybe,
  TopFive,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { LogoutButton } from "../authentication/components/LogoutButton";
import { FollowButton } from "./FollowButton";
import { UserPosts } from "./user-posts/UserPosts";
import { UserTopFiveView } from "./user-top-five/UserTopFiveView";
// import { client } from "../..";
import BottomSheet from "reanimated-bottom-sheet";
import { client } from "../../index";

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
  const [otherUser, setOtherUser] = React.useState<OtherUserData>({});
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

  useEffect(() => {
    try {
      const { getOtherUser: cacheData } = client.readQuery<GetOtherUserQuery>({
        query: GetOtherUserDocument,
        variables: {
          id,
        },
      });
      console.log("new cache data", cacheData);
    } catch (err) {
      console.log("no data yet", err);
    }
  });

  useEffect(() => {
    if (data) {
      setOtherUser(data.getOtherUser);
      console.log("data in userview ue", otherUser);
    }
    if (error) {
      console.log("error", error);
    } else {
      console.log("loafing", loading);
    }
  }, [data, loading, error]);

  useEffect(() => {
    console.log("brand new data in userview ue!!!", otherUser);
  }, [otherUser]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <UserPosts navigation={navigation} route={route} id={id} />;
      case "second":
        // TODO: take this as a prop from the navigation ...
        return <UserTopFiveView id={id} navigation={navigation} />;
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

  return (
    <StyledColumnView>
      <ScrollView>
        {otherUser && otherUser.followers ? (
          <StyledColumnView>
            <Card>
              {id === userState.id ? (
                <Button
                  icon="settings-outline"
                  onPress={() => {
                    navigation.navigate("SettingsPage");
                  }}>
                  Settings
                </Button>
              ) : (
                <></>
              )}

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}>
                <View>
                  {otherUser.profilePicture ? (
                    <Avatar.Image
                      size={80}
                      source={{
                        uri: `${otherUser.profilePicture}`,
                      }}
                    />
                  ) : (
                    <Avatar.Icon size={80} icon="account" />
                  )}
                </View>

                <View>
                  <Title>{otherUser.username}</Title>
                  {/* Followers and Following Count  */}
                  <View>
                    <Button
                      onPress={() => {
                        navigation.navigate("FollowersPage", {
                          id: id,
                          request: "followers",
                        });
                      }}>
                      FOLLOWERS:{" "}
                      {otherUser.followers.length > 1
                        ? otherUser.followers.length - 1
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
                      {otherUser.following.length > 1
                        ? otherUser.following.length - 1
                        : 0}
                    </Button>
                  </View>

                  <Caption>1 POSTS</Caption>

                  {id === userState.id ? (
                    <></>
                  ) : (
                    <FollowButton
                      id={id}
                      setOtherUser={setOtherUser}
                      follow={
                        otherUser.followers.includes(userState.id)
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
            <ScrollView>
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
              />
            </ScrollView>
          </StyledColumnView>
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </StyledColumnView>
  );
};

export type OtherUserData = { __typename?: "User" } & Pick<
  User,
  "id" | "username" | "email" | "profilePicture" | "followers" | "following"
> & {
    topAlbums?: Maybe<
      Array<
        Maybe<
          { __typename?: "TopFive" } & Pick<
            TopFive,
            "name" | "imageUrl" | "id" | "artistNames"
          >
        >
      >
    >;
    topArtists?: Maybe<
      Array<
        Maybe<
          { __typename?: "TopFive" } & Pick<TopFive, "name" | "imageUrl" | "id">
        >
      >
    >;
    topTracks?: Maybe<
      Array<
        Maybe<
          { __typename?: "TopFive" } & Pick<
            TopFive,
            "name" | "imageUrl" | "id" | "artistNames"
          >
        >
      >
    >;
  };
