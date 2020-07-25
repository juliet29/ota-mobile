import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper/src";
import { AlbumTopFiveEdit } from "./albums/AlbumTopFiveEdit";
import { ArtistTopFiveEdit } from "./artists/ArtistTopFiveEdit";
import { TrackTopFiveEdit } from "./tracks/TrackTopFiveEdit";
import { TopFivePreview } from "./TopFivePreview";

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
    <Swiper loop={false} style={styles.wrapper} showsButtons={true}>
      <View style={styles.slide1}>
        <ArtistTopFiveEdit array={artistArray} setArray={setArtistArray} />
      </View>
      <View style={styles.slide2}>
        <AlbumTopFiveEdit array={albumArray} setArray={setAlbumArray} />
      </View>
      <View style={styles.slide3}>
        <TrackTopFiveEdit array={trackArray} setArray={setTrackArray} />
      </View>
      <View style={styles.slide4}>
        <TopFivePreview
          artists={artistArray}
          albums={albumArray}
          tracks={trackArray}
        />
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
  slide4: {
    flex: 1,
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
