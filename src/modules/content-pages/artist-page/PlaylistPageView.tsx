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
import {
  StyledColumnView,
  RoundImage,
} from "../../../styled-components/ReusedUI";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { Image, Text, ImageBackground, View } from "react-native";
import { openURL } from "../../home/FeedView";
import { styles } from "../../../styled-components/StyleSheet";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface PlaylistPageViewProps {}

export const PlaylistPageView: React.FC<HomeStackNavProps<"PlaylistPage">> = ({
  route,
  navigation,
}) => {
  const themeContext = useContext(ThemeContext);
  const { playlist } = route.params;
  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../../local-assets/wavy.png")}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <RoundImage
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
            source={{
              uri: `${playlist.playlistPicture}`,
            }}
          />
          <Title>{playlist.title}</Title>
          <Caption>{playlist.description}</Caption>
        </View>

        <StyledColumnView>
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
                    color={themeContext.colors.primary}
                    icon="play-circle"
                    onPress={() => openURL(`${item.item.externalUrl}`)}
                  />
                )}
              />
            )}
            keyExtractor={(item, ix) => ix.toString().concat(item.toString())}
          />
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};
