import React from "react";
import {
  Caption,
  ActivityIndicator,
  Avatar,
  Subheading,
  List,
} from "react-native-paper";
import { useGetTopPlaylistsQuery } from "../../generated-components/apolloComponents";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { View, Image } from "react-native";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";

interface DiscoverPlaylistsProps {}

export const DiscoverPlaylists: React.FC<
  DiscoverPlaylistsProps & HomeStackNavProps<"Feed">
> = ({ navigation, route }) => {
  const { data, loading, error } = useGetTopPlaylistsQuery();

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
          data={data.getTopPlaylists}
          keyExtractor={(item, ix) => ix.toString().concat(item.title)}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                width: 200,
              }}>
              <Image
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
                source={{
                  uri: `${item.playlistPicture}`,
                }}
              />
              <List.Item
                title={item.title}
                onPress={() => {
                  navigation.navigate("PlaylistPage", {
                    playlist: item,
                  });
                }}
              />
              {/* <Subheading>{item.title}</Subheading> */}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};
