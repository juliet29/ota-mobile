import React, { useEffect } from "react";
import { Dimensions, View, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Caption,
  Card,
  Title,
  IconButton,
  List,
} from "react-native-paper";
import { TabView, TabBar } from "react-native-tab-view";
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
import {
  StyledColumnView,
  LineBreak,
  ThinLine,
} from "../../styled-components/ReusedUI";
import { LogoutButton } from "../authentication/components/LogoutButton";
import { FollowButton } from "./FollowButton";
import { UserPosts } from "./user-posts/UserPosts";
import { UserTopFiveView } from "./user-top-five/UserTopFiveView";
// import { client } from "../..";
import BottomSheet from "reanimated-bottom-sheet";
import { client } from "../../index";
import { styles } from "../../styled-components/StyleSheet";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

export const emptyImage =
  "https://www.pikpng.com/pngl/m/39-398340_emergency-medicine-physician-robert-tomsho-empty-profile-picture.png";

interface UserViewProps {}
const initialLayout = { width: Dimensions.get("window").width };

export const UserView: React.FC<HomeStackNavProps<"UserPage">> = ({
  navigation,
  route,
}) => {
  const themeContext = useContext(ThemeContext);
  const userState = useStoreState((state) => state.user.user);
  const [index, setIndex] = React.useState(0);
  const [otherUser, setOtherUser] = React.useState<OtherUserData>({});
  const [routes] = React.useState([
    { key: "first", title: "Posts" },
    { key: "second", title: "Top 5" },
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

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: themeContext.colors.accent }}
      style={{ backgroundColor: themeContext.colors.transparent }}
    />
  );

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
  // console.log(
  //   `i am following this user ${data.getOtherUser.followers.includes(
  //     userState.id
  //   )}. I know this because their followers are ${
  //     data.getOtherUser.followers
  //   } and my id is ${userState.id}`
  // );

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
      <View>
        <ScrollView>
          {otherUser && otherUser.followers ? (
            <View>
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginBottom: -40,
                }}>
                {id === userState.id ? (
                  <IconButton
                    icon="settings-outline"
                    onPress={() => {
                      navigation.navigate("SettingsPage");
                    }}
                  />
                ) : (
                  <></>
                )}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 30,
                }}>
                <List.Item
                  title={otherUser.username}
                  titleStyle={{ fontSize: 25, fontWeight: "bold" }}
                  titleNumberOfLines={3}
                  description={"1 POST"}
                  descriptionStyle={{
                    color: themeContext.colors.accent,
                    marginTop: 10,
                  }}
                  left={() => (
                    <View
                      style={{
                        marginTop: 50,
                        marginRight: 10,
                      }}>
                      {otherUser.profilePicture ? (
                        <Avatar.Image
                          size={140}
                          source={{
                            uri: `${otherUser.profilePicture}`,
                          }}
                        />
                      ) : (
                        <Avatar.Icon size={140} icon="account" />
                      )}
                    </View>
                  )}
                />

                {/* Followers and Following Count  */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    position: "absolute",
                    width: "100%",
                    bottom: -20,
                    left: 140,
                  }}>
                  <Button
                    style={{
                      width: "40%",
                      margin: 0,
                    }}
                    color={themeContext.colors.text}
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
                    style={{
                      width: "40%",
                    }}
                    color={themeContext.colors.text}
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
                  <View style={{ marginLeft: 20 }}>
                    {id === userState.id ? (
                      <LogoutButton />
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
                  </View>
                </View>
              </View>

              <ThinLine style={{ marginHorizontal: 20 }} />

              <ScrollView>
                <TabView
                  renderTabBar={renderTabBar}
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  initialLayout={initialLayout}
                />
              </ScrollView>
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </View>
    </ImageBackground>
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
