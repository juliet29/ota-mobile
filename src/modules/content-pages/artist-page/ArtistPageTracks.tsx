import React, { useState, useEffect, useRef } from "react";
import { useGetArtistTopTracksQuery } from "../../../generated-components/apolloComponents";
import { ActivityIndicator, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card, Subheading, Caption, Text, Button } from "react-native-paper";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";

interface ArtistProps {
  id: string;
}

export const ArtistPageTracks: React.FC<
  ArtistProps & HomeStackNavProps<"ArtistPage">
> = ({ id, navigation, route }) => {
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
    <FlatList
      data={data.getArtistTopTracks.tracks!}
      renderItem={(item) => (
        <Card>
          <Card.Content style={{ alignItems: "center" }}>
            {
              item?.item.album.images.map((element) => (
                <Image
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                  source={{
                    uri: `${element.url}`,
                  }}
                />
              ))[0]
            }
            <Subheading style={{ textAlign: "center" }}>
              {item.item.name}
            </Subheading>
            {item.item.artists.map((element, ix) => (
              <Caption key={ix}>{element.name}</Caption>
            ))}

            <Button
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
              }}>
              See Posts About This Track
            </Button>
          </Card.Content>
        </Card>
      )}
      keyExtractor={(item, ix) => ix.toString()}
    />
  );
};
