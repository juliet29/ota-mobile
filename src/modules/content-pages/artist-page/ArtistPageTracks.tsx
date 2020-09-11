import React, { useState, useEffect, useRef } from "react";
import { useGetArtistTopTracksQuery } from "../../../generated-components/apolloComponents";
import { ActivityIndicator, Image } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  Card,
  Subheading,
  Caption,
  Text,
  Button,
  List,
} from "react-native-paper";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { RoundImage } from "../../../styled-components/ReusedUI";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface ArtistProps {
  id: string;
}

export const ArtistPageTracks: React.FC<
  ArtistProps & HomeStackNavProps<"ArtistPage">
> = ({ id, navigation, route }) => {
  const themeContext = useContext(ThemeContext);
  const { data, loading, error } = useGetArtistTopTracksQuery({
    variables: {
      id: id,
    },
  });

  // actually render
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  return (
    <ScrollView horizontal={true}>
      <FlatList
        // style={{
        //   height: "100%",
        //   // width: "50%",
        // }}
        numColumns={2}
        // contentContainerStyle={{
        //   display: "flex",
        //   flexDirection: "column",
        //   width: "50%",
        // }}
        data={
          data.getArtistTopTracks.tracks.length > 8
            ? data.getArtistTopTracks.tracks.slice(0, 8)
            : data.getArtistTopTracks.tracks
        }
        renderItem={(item) => (
          <List.Item
            style={{ width: 250, marginRight: 30, display: "flex" }}
            title={item.item.name}
            titleStyle={{ width: 200 }}
            titleNumberOfLines={2}
            description={item.item.artists.map((i) => i.name).join(", ")}
            descriptionNumberOfLines={1}
            descriptionStyle={{
              color: themeContext.colors.accentTwo,
              width: 200,
            }}
            left={() => (
              <RoundImage
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
                source={{
                  uri: `${item.item.album.images.map((i) => i.url)[0]}`,
                }}
              />
            )}
            onPress={() => {
              const artistNames = item?.item.artists.map((i) => i.name);
              navigation.navigate("TrackPage", {
                id: item?.item.id,
                name: item?.item.name,
                artistNames: artistNames,
                imageUrl: item?.item.album.images.map(
                  (element) => element.url
                )[0],
              });
            }}
          />
        )}
        keyExtractor={(item, ix) => ix.toString()}
      />
    </ScrollView>
  );
};
