import React from "react";
import {
  Caption,
  ActivityIndicator,
  Avatar,
  Subheading,
  List,
} from "react-native-paper";
import { useGetTopPlaylistsQuery } from "../../generated-components/apolloComponents";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { View, Image, Text } from "react-native";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { RoundImage } from "../../styled-components/ReusedUI";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface DiscoverPlaylistsProps {}

export const DiscoverPlaylists: React.FC<
  DiscoverPlaylistsProps & HomeStackNavProps<"Feed">
> = ({ navigation, route }) => {
  const themeContext = useContext(ThemeContext);
  const { data, loading, error } = useGetTopPlaylistsQuery();

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
          data={data.getTopPlaylists}
          keyExtractor={(item, ix) => ix.toString().concat(item.title)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PlaylistPage", {
                  playlist: item,
                });
              }}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  width: 130,
                }}>
                <RoundImage
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                  source={{
                    uri: `${item.playlistPicture}`,
                  }}
                />
                <Text
                  style={{
                    color: themeContext.colors.accent,
                    textAlign: "center",
                    marginLeft: -35,
                    padding: 0,
                    marginVertical: 15,
                  }}>
                  {item.title}
                </Text>
                {/* <List.Item
                title={item.title}
                titleStyle={{ color: themeContext.colors.accent }}
                
              /> */}
                {/* <Subheading>{item.title}</Subheading> */}
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};
