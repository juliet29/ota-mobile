import React from "react";
import {
  Caption,
  ActivityIndicator,
  List,
  Avatar,
  Headline,
  Subheading,
} from "react-native-paper";
import { useGetTopArtistsQuery } from "../../generated-components/apolloComponents";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { View, Image } from "react-native";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface DiscoverArtistsProps {}

export const DiscoverArtists: React.FC<
  DiscoverArtistsProps & HomeStackNavProps<"Feed">
> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const { data, loading, error } = useGetTopArtistsQuery();
  console.log("data artist", data);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  // onlu unique artists
  const flags = new Set();
  const myUniqueArtists = data.getTopArtists.filter((entry) => {
    if (flags.has(entry.artistId)) {
      return false;
    }
    flags.add(entry.artistId);
    return true;
  });

  return (
    <View>
      <ScrollView horizontal={true}>
        <FlatList
          contentContainerStyle={{
            justifyContent: "space-around",
            flexDirection: "row",
          }}
          data={myUniqueArtists}
          keyExtractor={(item, ix) => ix.toString().concat(item.artistName)}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                width: 120,
              }}>
              <Avatar.Image
                size={80}
                source={{
                  uri: `${item.imageUrl}`,
                }}
              />
              <List.Item
                title={item.artistName}
                titleStyle={{
                  color: themeContext.colors.accentTwo,
                }}
                onPress={() => {
                  navigation.navigate("ArtistPage", {
                    id: item?.artistId,
                    name: item?.artistName,
                    imageUrl: item.imageUrl,
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
