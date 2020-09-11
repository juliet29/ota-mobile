import React from "react";
import { ScrollView, ImageBackground, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Headline,
  Subheading,
  Title,
  List,
} from "react-native-paper";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { ArtistPageAlbums } from "./ArtistPageAlbums";
import { ArtistPageTracks } from "./ArtistPageTracks";
import { styles } from "../../../styled-components/StyleSheet";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

export const ArtistPageView: React.FC<HomeStackNavProps<"ArtistPage">> = ({
  route,
  navigation,
}) => {
  const themeContext = useContext(ThemeContext);
  const { id, name, imageUrl } = route.params;

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../../local-assets/wavy.png")}>
      <ScrollView>
        <View>
          <List.Item
            title={name}
            description={"+1.1 MILLION FOLLOWERS"}
            descriptionStyle={{ color: themeContext.colors.accent }}
            titleStyle={{ fontSize: 30, fontWeight: "bold" }}
            left={() => (
              <View style={{ marginTop: 50 }}>
                <Avatar.Image size={140} source={{ uri: `${imageUrl}` }} />
              </View>
            )}
          />

          <Button
            icon="account-plus"
            style={{
              width: "30%",
              height: "17%",
              position: "absolute",
              bottom: 20,
              left: 155,
              padding: 0,
            }}
            mode="contained">
            Follow
          </Button>
        </View>

        <StyledColumnView>
          <Headline>Top Songs</Headline>
          <ArtistPageTracks id={id} navigation={navigation} route={route} />
        </StyledColumnView>

        <StyledColumnView>
          <Headline>Albums</Headline>
          <ArtistPageAlbums id={id} navigation={navigation} route={route} />
        </StyledColumnView>

        <Button
          style={{ marginHorizontal: 30, marginBottom: 30 }}
          mode="contained"
          onPress={() => {
            navigation.navigate("ArtistPosts", {
              id: id,
              name: name,
            });
          }}>
          See Shares of this Artist
        </Button>
      </ScrollView>
    </ImageBackground>
  );
};
