import React from "react";
import { Caption, Subheading, Title } from "react-native-paper";
import { DiscoverAlbums } from "./DiscoverAlbums";
import {
  StyledColumnView,
  Wrapper,
  LineBreak,
} from "../../styled-components/ReusedUI";
import { DiscoverPlaylists } from "./DiscoverPlaylists";
import { DiscoverArtists } from "./DiscoverArtists";
import { DiscoverReviews } from "./DiscoverReviews";

interface DiscoverProps {}

export const Discover: React.FC<DiscoverProps> = ({}) => {
  return (
    <StyledColumnView>
      <LineBreak />
      <Title>Discover</Title>
      <Subheading>New Albums</Subheading>
      <DiscoverAlbums />
      <Subheading>Most Popular Reviews</Subheading>
      <DiscoverReviews />
      <Subheading>Hot Artists</Subheading>
      <DiscoverArtists />
      <Subheading>Popular Playlists</Subheading>
      <DiscoverPlaylists />
    </StyledColumnView>
  );
};
