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
import { View, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface DiscoverProps {}

export const Discover: React.FC<DiscoverProps & HomeStackNavProps<"Feed">> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Title>Discover</Title>
        <Heading>New Albums</Heading>
        <DiscoverAlbums navigation={navigation} route={route} />
        <LineBreak />
        <Heading>Most Popular Reviews</Heading>
        <DiscoverReviews navigation={navigation} route={route} />
        <LineBreak />
        <Heading>Hot Artists</Heading>
        <DiscoverArtists navigation={navigation} route={route} />
        <LineBreak />
        <Heading>Popular Playlists</Heading>
        <DiscoverPlaylists navigation={navigation} route={route} />
      </ScrollView>
    </SafeAreaView>
  );
};
