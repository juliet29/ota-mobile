import React from "react";
import { Title, Card, Caption, Subheading } from "react-native-paper";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { Image, Text } from "react-native";

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
            <Title>{name}</Title>
          </Card.Content>
        </Card>
      </StyledColumnView>

      <StyledColumnView>
        <Caption>SONGS</Caption>
        <FlatList
          data={playlist.tracks}
          renderItem={(item) => (
            <Card>
              <Card.Content style={{ alignItems: "center" }}>
                <Subheading>{item.item.name}</Subheading>
                {item.item.artists.map((element, ix) => (
                  <Caption key={ix}>{element}</Caption>
                ))}
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item, ix) => ix.toString()}
        />
      </StyledColumnView>
    </ScrollView>
  );
};
