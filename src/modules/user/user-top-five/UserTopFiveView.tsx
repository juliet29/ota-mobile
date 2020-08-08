import React from "react";
import { Card, Caption, Subheading } from "react-native-paper";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { AlbumTopFiveWrapper } from "./types/albums/AlbumTopFiveWrapper";
import { TopFive } from "../../../generated-components/apolloComponents";
import { ArtistTopFiveWrapper } from "./types/artists/ArtistTopFiveWrapper";
import { TrackTopFiveWrapper } from "./types/tracks/TrackTopFiveWrapper";

interface UserTopFiveViewProps {
  id: number;
}

export interface TopFiveEditProps {
  array: TopFiveArrayType[];
  setArray: React.Dispatch<React.SetStateAction<TopFiveArrayType[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  arrayIndex: number;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

export interface TopFiveWrapperProps {
  id: number;
  type: string;
}

export type TopFiveArrayType = {
  id?: string;
  name?: string;
  imageUrl?: string;
  artistNames?: string[];
};

export const UserTopFiveView: React.FC<UserTopFiveViewProps> = ({ id }) => {
  // console.log(id);
  return (
    <StyledColumnView>
      <Subheading>Album Top Five</Subheading>
      <AlbumTopFiveWrapper id={id} type={"album"} />

      <Subheading>Artist Top Five</Subheading>
      <AlbumTopFiveWrapper id={id} type={"artist"} />

      <Subheading>Track Top Five</Subheading>
      <AlbumTopFiveWrapper id={id} type={"track"} />
      {/* <ArtistTopFiveWrapper id={id} />
      <TrackTopFiveWrapper id={id} /> */}
    </StyledColumnView>
  );
};
