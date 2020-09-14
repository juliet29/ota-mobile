import React from "react";
import { Caption, Subheading as Heading, Title } from "react-native-paper";
import { DiscoverAlbums } from "./DiscoverAlbums";
import {
  StyledColumnView,
  Wrapper,
  LineBreak,
} from "../../styled-components/ReusedUI";
import { DiscoverPlaylists } from "./DiscoverPlaylists";
import { DiscoverArtists } from "./DiscoverArtists";
import { DiscoverReviews } from "./DiscoverReviews";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { View, SafeAreaView, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../styled-components/StyleSheet";
import { BoldWhiteHeading } from "../../styled-components/StylishComponents";

interface DiscoverProps {}

export const Discover: React.FC<DiscoverProps & HomeStackNavProps<"Feed">> = ({
  navigation,
  route,
}) => {
  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              margin: 10,
            }}>
            <Title>Discover</Title>
            <LineBreak />
            <BoldWhiteHeading>New Albums</BoldWhiteHeading>
            <DiscoverAlbums navigation={navigation} route={route} />
            <LineBreak />
            <BoldWhiteHeading>Most Popular Reviews</BoldWhiteHeading>
            <DiscoverReviews navigation={navigation} route={route} />
            <LineBreak />
            <BoldWhiteHeading>Hot Artists</BoldWhiteHeading>
            <DiscoverArtists navigation={navigation} route={route} />
            <LineBreak />
            <BoldWhiteHeading>Popular Playlists</BoldWhiteHeading>
            <DiscoverPlaylists navigation={navigation} route={route} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
