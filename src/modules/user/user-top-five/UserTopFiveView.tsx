import React from "react";
import { Card, Caption, Subheading } from "react-native-paper";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { AlbumTopFiveWrapper } from "./types/albums/AlbumTopFiveWrapper";
import { TopFive } from "../../../generated-components/apolloComponents";
import { ArtistTopFiveWrapper } from "./types/artists/ArtistTopFiveWrapper";
import { TrackTopFiveWrapper } from "./types/tracks/TrackTopFiveWrapper";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeParamList } from "../../../navigation/app/home/HomeParamList";
import { BoldWhiteHeading } from "../../../styled-components/StylishComponents";
import { View } from "react-native";

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
    <View
      style={{
        margin: 20,
      }}>
      <BoldWhiteHeading>Top 5 Albums</BoldWhiteHeading>

      <AlbumTopFiveWrapper id={id} type={"album"} navigation={navigation} />

      <BoldWhiteHeading>Top 5 Artists</BoldWhiteHeading>
      <AlbumTopFiveWrapper id={id} type={"artist"} navigation={navigation} />

      <BoldWhiteHeading>Top 5 Tracks</BoldWhiteHeading>
      <AlbumTopFiveWrapper id={id} type={"track"} navigation={navigation} />
    </View>
  );
};
