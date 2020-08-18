import React from "react";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import {
  Caption,
  ToggleButton,
  Title,
  ActivityIndicator,
} from "react-native-paper";
import { GestureResponderEvent, View } from "react-native";
import {
  ArtistPostView,
  AlbumPostView,
  TrackPostView,
} from "../../../modules/user/user-posts/UserPostTypes";

import {
  useGetUserPostsQuery,
  useGetMyListQuery,
} from "../../../generated-components/apolloComponents";
import { useStoreState } from "../../../state-management/hooks";
import { AppNavProps } from "../AppParamList";
import { HomeStackNavProps } from "../home/HomeParamList";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { RemoveFromMyListButton } from "./RemoveFromMyListButton";
import {
  PlaylistView,
  PlaylistUserView,
} from "../../../modules/home/PlaylistView";

interface MyListProps {}
// AppNavProps<"MyList"> &

type Status = "checked" | "unchecked";
type setFx = (value?: string | GestureResponderEvent) => void;

export const MyList: React.FC<MyListProps & HomeStackNavProps<"UserPage">> = ({
  navigation,
  route,
}) => {
  const [artistStatus, setArtistStatus] = React.useState("checked");
  const [albumStatus, setAlbumStatus] = React.useState("checked");
  const [trackStatus, setTrackStatus] = React.useState("checked");
  const [playlistStatus, setPlaylistStatus] = React.useState("checked");

  const onArtistButtonToggle = (value) => {
    console.log("toggle artist", artistStatus);
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
  const { data, loading, error } = useGetMyListQuery();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  return (
    <StyledColumnView>
      <Title>My List</Title>
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
            onPress={item[2] as setFx}
          />
        )}
        keyExtractor={(item, ix) => ix.toString()}
      />
      <ScrollView>
        <FlatList
          data={data.getMyList}
          renderItem={({ item }) => (
            <StyledColumnView>
              {artistStatus === "checked" &&
              item?.__typename === "ArtistPost" ? (
                <View>
                  <ArtistPostView
                    item={item}
                    navigation={navigation}
                    route={route}
                  />
                  <RemoveFromMyListButton
                    postId={+item.id}
                    postType={"artist"}
                  />
                </View>
              ) : albumStatus === "checked" &&
                item?.__typename === "AlbumPost" ? (
                <View>
                  <AlbumPostView
                    item={item}
                    navigation={navigation}
                    route={route}
                  />
                  <RemoveFromMyListButton
                    postId={+item.id}
                    postType={"album"}
                  />
                </View>
              ) : trackStatus === "checked" &&
                item?.__typename === "TrackPost" ? (
                <View>
                  <TrackPostView
                    item={item}
                    navigation={navigation}
                    route={route}
                  />
                  <RemoveFromMyListButton
                    postId={+item.id}
                    postType={"artist"}
                  />
                </View>
              ) : playlistStatus === "checked" &&
                item?.__typename === "Playlist" ? (
                <View>
                  <PlaylistUserView
                    item={item}
                    navigation={navigation}
                    route={route}
                  />
                  <RemoveFromMyListButton
                    postId={+item.id}
                    postType={"artist"}
                  />
                </View>
              ) : (
                <></>
              )}
            </StyledColumnView>
          )}
          keyExtractor={(item, ix) => ix.toString()}
        />
      </ScrollView>
    </StyledColumnView>
  );
};
