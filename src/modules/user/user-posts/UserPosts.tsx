import React from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Caption,
  Card,
  ToggleButton,
} from "react-native-paper";
import { useGetUserPostsQuery } from "../../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { useStoreState } from "../../../state-management/hooks";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import {
  AlbumPostView,
  ArtistPostView,
  TrackPostView,
  UserContentPostView,
} from "./UserPostTypes";
// import { UserPostsFilter } from "./UserPostsFilter";
import { GestureResponderEvent, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface UserPostsProps {
  id: number;
}

type Status = "checked" | "unchecked";
type setFx = (value?: string | GestureResponderEvent) => void;

export const UserPosts: React.FC<
  UserPostsProps & HomeStackNavProps<"UserPage">
> = ({ navigation, route, id }) => {
  const themeContext = useContext(ThemeContext);
  // toggle button data
  const [artistStatus, setArtistStatus] = React.useState("checked");
  const [albumStatus, setAlbumStatus] = React.useState("checked");
  const [trackStatus, setTrackStatus] = React.useState("checked");
  const [playlistStatus, setPlaylistStatus] = React.useState("checked");

  const onArtistButtonToggle = (value) => {
    setArtistStatus(artistStatus === "checked" ? "unchecked" : "checked");
  };

  const onAlbumButtonToggle = (value) => {
    setAlbumStatus(albumStatus === "checked" ? "unchecked" : "checked");
  };

  const onTrackButtonToggle = (value) => {
    setTrackStatus(trackStatus === "checked" ? "unchecked" : "checked");
  };

  const onPlaylistButtonToggle = (value) => {
    setPlaylistStatus(playlistStatus === "checked" ? "unchecked" : "checked");
  };

  const buttonArray = [
    ["artist", artistStatus, onArtistButtonToggle],
    ["album", albumStatus, onAlbumButtonToggle],
    ["music", trackStatus, onTrackButtonToggle],
    ["playlist-music", playlistStatus, onPlaylistButtonToggle],
  ];

  // get user posts
  const userState = useStoreState((state) => state.user.user);
  const { data, loading, error } = useGetUserPostsQuery({
    variables: {
      id,
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  return (
    <View
      style={{
        backgroundColor: themeContext.colors.backgroundContrast,
        paddingTop: 30,
      }}>
      <FlatList
        contentContainerStyle={{
          justifyContent: "space-around",
          flexDirection: "row",
        }}
        data={buttonArray}
        renderItem={({ item }) => (
          <ToggleButton
            icon={item[0] as string}
            value={item[0] as string}
            status={item[1] as Status}
            style={{
              backgroundColor:
                item[1] === "checked"
                  ? themeContext.colors.accentTwo
                  : themeContext.colors.text,
            }}
            onPress={item[2] as setFx}
          />
        )}
        keyExtractor={(item, ix) => ix.toString()}
      />
      <ScrollView>
        <FlatList
          contentContainerStyle={{
            marginVertical: 30,
            marginHorizontal: 20,
            display: "flex",
            flexDirection: "column-reverse",
          }}
          data={data.getUserPosts}
          renderItem={({ item }) => (
            <View>
              {artistStatus === "checked" &&
              item?.__typename === "ArtistPost" ? (
                <UserContentPostView
                  item={item}
                  navigation={navigation}
                  route={route}
                />
              ) : albumStatus === "checked" &&
                item?.__typename === "AlbumPost" ? (
                <UserContentPostView
                  item={item}
                  navigation={navigation}
                  route={route}
                />
              ) : trackStatus === "checked" &&
                item?.__typename === "TrackPost" ? (
                <UserContentPostView
                  item={item}
                  navigation={navigation}
                  route={route}
                />
              ) : playlistStatus === "checked" &&
                item?.__typename === "Playlist" ? (
                <UserContentPostView
                  item={item}
                  navigation={navigation}
                  route={route}
                />
              ) : (
                <></>
              )}
            </View>
          )}
          keyExtractor={(item, ix) => ix.toString()}
        />
      </ScrollView>
    </View>
  );
};
