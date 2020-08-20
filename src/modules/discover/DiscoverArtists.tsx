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

interface DiscoverArtistsProps {}

export const DiscoverArtists: React.FC<
  DiscoverArtistsProps & HomeStackNavProps<"Feed">
> = ({ navigation }) => {
  const { data, loading, error } = useGetTopArtistsQuery();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  return (
    <ScrollView horizontal={true}>
      <View>
        <FlatList
          contentContainerStyle={{
            justifyContent: "space-around",
            flexDirection: "row",
          }}
          data={data.getTopArtists}
          keyExtractor={(item, ix) => ix.toString().concat(item.artistName)}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                width: 200,
              }}>
              <Avatar.Image
                size={80}
                source={{
                  uri: `${item.imageUrl}`,
                }}
              />
              <List.Item
                title={item.artistName}
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
      </View>
    </ScrollView>
  );
};
