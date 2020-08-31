import React from "react";
import { Card, Caption, Subheading } from "react-native-paper";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { AlbumTopFiveWrapper } from "./types/albums/AlbumTopFiveWrapper";
import { TopFive } from "../../../generated-components/apolloComponents";
import { ArtistTopFiveWrapper } from "./types/artists/ArtistTopFiveWrapper";
import { TrackTopFiveWrapper } from "./types/tracks/TrackTopFiveWrapper";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeParamList } from "../../../navigation/app/home/HomeParamList";

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
  navigation: StackNavigationProp<HomeParamList, "UserPage">;
}

export type TopFiveArrayType = {
  id?: string;
  name?: string;
  imageUrl?: string;
  artistNames?: string[];
};

interface UserTopFiveViewProps {
  id: number;
  navigation: StackNavigationProp<HomeParamList, "UserPage">;
}

export const UserTopFiveView: React.FC<UserTopFiveViewProps> = ({
  id,
  navigation,
}) => {
  // console.log(id);
  return (
    <StyledColumnView>
      <Subheading>Album Top Five</Subheading>
      <AlbumTopFiveWrapper id={id} type={"album"} navigation={navigation} />

      <Subheading>Artist Top Five</Subheading>
      <AlbumTopFiveWrapper id={id} type={"artist"} navigation={navigation} />

      <Subheading>Track Top Five</Subheading>
      <AlbumTopFiveWrapper id={id} type={"track"} navigation={navigation} />
      {/* <ArtistTopFiveWrapper id={id} />
      <TrackTopFiveWrapper id={id} /> */}
    </StyledColumnView>
  );
};
