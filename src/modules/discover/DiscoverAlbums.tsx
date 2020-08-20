import React from "react";
import {
  Caption,
  ActivityIndicator,
  Headline,
  List,
  Text,
} from "react-native-paper";
import { useGetReccomendationsQuery } from "../../generated-components/apolloComponents";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { View, Image } from "react-native";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";

interface DiscoverAlbumsProps {}

export const DiscoverAlbums: React.FC<
  DiscoverAlbumsProps & HomeStackNavProps<"Feed">
> = ({ navigation }) => {
  const { data, loading, error } = useGetReccomendationsQuery();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  return (
    <View>
      <ScrollView horizontal={true}>
        <FlatList
          contentContainerStyle={{
            justifyContent: "space-around",
            flexDirection: "row",
          }}
          data={data.getReccomendations.tracks}
          keyExtractor={(item, ix) => ix.toString().concat(item.name)}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}>
              <Image
                style={{ width: 100, height: 100, marginLeft: 20 }}
                resizeMode="contain"
                source={{
                  uri: `${item.album.images.map((i) => i.url)[0]}`,
                }}
              />
              <List.Item
                style={{ width: 150 }}
                title={item.album.name}
                titleNumberOfLines={2}
                description={item.album.artists.map((i) => i.name)}
                onPress={() => {
                  // console.log("album button");
                  navigation.navigate("AlbumPage", {
                    id: item?.album.id,
                    name: item.album.name,
                    imageUrl: item?.album.images.map((i) => i.url)[0],
                  });
                }}
              />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};
