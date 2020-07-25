import React, { useState } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { Caption, Card, Title, Searchbar } from "react-native-paper";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import Swiper from "react-native-swiper/src";
import { ArtistSearchType } from "../../search/search-types/ArtistSearchType";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { ArtistTopFiveEdit } from "./settings-top-five-types/artists/ArtistTopFiveEdit";
import { AlbumTopFiveEdit } from "./settings-top-five-types/albums/AlbumTopFiveEdit";
import { TrackTopFiveEdit } from "./settings-top-five-types/tracks/TrackTopFiveEdit";

interface TopFiveSwiperProps {}
export type TopFiveArrayType = {
  id?: string;
  name?: string;
  imageUrl?: string;
  artistNames?: string[];
};

export const TopFiveSwiper: React.FC<TopFiveSwiperProps> = ({}) => {
  const [artistArray, setArtistArray] = useState(Array<TopFiveArrayType>());
  const [albumArray, setAlbumArray] = useState(Array<TopFiveArrayType>());
  const [trackArray, setTrackArray] = useState(Array<TopFiveArrayType>());

  return (
    <Swiper style={styles.wrapper} showsButtons={true}>
      <View style={styles.slide1}>
        <ArtistTopFiveEdit array={artistArray} setArray={setArtistArray} />
      </View>
      <View style={styles.slide2}>
        <AlbumTopFiveEdit array={albumArray} setArray={setAlbumArray} />
      </View>
      <View style={styles.slide3}>
        <TrackTopFiveEdit array={trackArray} setArray={setTrackArray} />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
