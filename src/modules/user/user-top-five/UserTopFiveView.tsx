import React from "react";
import { Card, Caption } from "react-native-paper";
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
}

export interface TopFiveWrapperProps {
  id: number;
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
      <AlbumTopFiveWrapper id={id} />
      <ArtistTopFiveWrapper id={id} />
      <TrackTopFiveWrapper id={id} />
    </StyledColumnView>
  );
};
