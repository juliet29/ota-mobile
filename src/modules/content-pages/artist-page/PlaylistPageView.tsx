import React from "react";
import {
  Title,
  Card,
  Caption,
  Subheading,
  Avatar,
  List,
  IconButton,
} from "react-native-paper";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { Image, Text } from "react-native";
import { openURL } from "../../home/FeedView";

interface PlaylistPageViewProps {}

export const PlaylistPageView: React.FC<HomeStackNavProps<"PlaylistPage">> = ({
  route,
  navigation,
}) => {
  const { playlist } = route.params;
  return (
    <ScrollView>
      <StyledColumnView>
        <Card>
          <Card.Content style={{ alignItems: "center" }}>
            <Image
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
              source={{
                uri: `${playlist.playlistPicture}`,
              }}
            />
            <Title>{playlist.title}</Title>
          </Card.Content>
        </Card>
      </StyledColumnView>

      <StyledColumnView>
        <Caption>SONGS</Caption>
        <FlatList
          data={playlist.tracks}
          renderItem={(item) => (
            <List.Item
              onPress={() => {
                navigation.navigate("TrackPage", {
                  id: item?.item.id,
                  name: item?.item.name,
                  artistNames: item.item?.artists?.map((i) => i),
                  imageUrl: item.item.trackImageUrl,
                });
              }}
              title={item.item?.name}
              description={item.item?.artists?.map((i, ix) => i)}
              left={(props) => (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: `${item.item.trackImageUrl}`,
                  }}
                />
              )}
              right={() => (
                <IconButton
                  icon="play"
                  onPress={() => openURL(`${item.item.externalUrl}`)}
                />
              )}
            />
          )}
          keyExtractor={(item, ix) => ix.toString().concat(item.toString())}
        />
      </StyledColumnView>
    </ScrollView>
  );
};
