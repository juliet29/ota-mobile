import React from "react";
import { GestureResponderEvent, ImageBackground, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Caption,
  Title,
  ToggleButton,
} from "react-native-paper";
import { useGetMyListQuery } from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { useStoreState } from "../../state-management/hooks";
import { RowSpaceBetween } from "../../styled-components/ReusedUI";
import { styles } from "../../styled-components/StyleSheet";
import { MyListPostView } from "./MyListPostView";
import { RemoveFromMyListButton } from "./RemoveFromMyListButton";

interface MyListProps {}

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

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
      <ScrollView>
        <View
          style={{
            margin: 30,
            marginTop: 50,
          }}>
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

          <FlatList
            data={data.getMyList}
            renderItem={({ item }) => (
              <View>
                {artistStatus === "checked" &&
                item?.__typename === "ArtistPost" ? (
                  <RowSpaceBetween>
                    <MyListPostView
                      item={item}
                      navigation={navigation}
                      route={route}
                    />
                    <RemoveFromMyListButton
                      postId={+item.id}
                      postType={"artist"}
                    />
                  </RowSpaceBetween>
                ) : albumStatus === "checked" &&
                  item?.__typename === "AlbumPost" ? (
                  <RowSpaceBetween>
                    <MyListPostView
                      item={item}
                      navigation={navigation}
                      route={route}
                    />
                    <RemoveFromMyListButton
                      postId={+item.id}
                      postType={"album"}
                    />
                  </RowSpaceBetween>
                ) : trackStatus === "checked" &&
                  item?.__typename === "TrackPost" ? (
                  <RowSpaceBetween>
                    <MyListPostView
                      item={item}
                      navigation={navigation}
                      route={route}
                    />
                    <RemoveFromMyListButton
                      postId={+item.id}
                      postType={"track"}
                    />
                  </RowSpaceBetween>
                ) : playlistStatus === "checked" &&
                  item?.__typename === "Playlist" ? (
                  <RowSpaceBetween>
                    <MyListPostView
                      item={item}
                      navigation={navigation}
                      route={route}
                    />
                    <RemoveFromMyListButton
                      postId={+item.id}
                      postType={"playlist"}
                    />
                  </RowSpaceBetween>
                ) : (
                  <></>
                )}
              </View>
            )}
            keyExtractor={(item, ix) => ix.toString()}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
