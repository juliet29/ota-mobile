import React from "react";
import { FlatList } from "react-native-gesture-handler";
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
import { AlbumPostView, ArtistPostView, TrackPostView } from "./UserPostTypes";
// import { UserPostsFilter } from "./UserPostsFilter";
import { GestureResponderEvent } from "react-native";

interface UserPostsProps {
  id: number;
}

type Status = "checked" | "unchecked";
type setFx = (value?: string | GestureResponderEvent) => void;

export const UserPosts: React.FC<
  UserPostsProps & HomeStackNavProps<"UserPage">
> = ({ navigation, route, id }) => {
  // toggle button data
  const [artistStatus, setArtistStatus] = React.useState("checked");
  const [albumStatus, setAlbumStatus] = React.useState("checked");
  const [trackStatus, setTrackStatus] = React.useState("checked");

  const onArtistButtonToggle = (value) => {
    setArtistStatus(artistStatus === "checked" ? "unchecked" : "checked");
  };

  const onAlbumButtonToggle = (value) => {
    setAlbumStatus(albumStatus === "checked" ? "unchecked" : "checked");
  };

  const onTrackButtonToggle = (value) => {
    setTrackStatus(trackStatus === "checked" ? "unchecked" : "checked");
  };

  const buttonArray = [
    ["artist", artistStatus, onArtistButtonToggle],
    ["album", albumStatus, onAlbumButtonToggle],
    ["music", trackStatus, onTrackButtonToggle],
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
    <Card>
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

      <FlatList
        data={data.getUserPosts}
        renderItem={({ item }) => (
          <StyledColumnView>
            {artistStatus === "checked" && item?.__typename === "ArtistPost" ? (
              <ArtistPostView
                item={item}
                navigation={navigation}
                route={route}
              />
            ) : albumStatus === "checked" &&
              item?.__typename === "AlbumPost" ? (
              <AlbumPostView
                item={item}
                navigation={navigation}
                route={route}
              />
            ) : trackStatus === "checked" &&
              item?.__typename === "TrackPost" ? (
              <TrackPostView
                item={item}
                navigation={navigation}
                route={route}
              />
            ) : (
              <></>
            )}
          </StyledColumnView>
        )}
        keyExtractor={(item, ix) => ix.toString()}
      />
    </Card>
  );
};
