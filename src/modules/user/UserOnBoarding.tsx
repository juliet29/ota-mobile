import React, { useState } from "react";
import { Caption } from "react-native-paper";
import Swiper from "react-native-swiper/src";
import { View, StyleSheet, Text } from "react-native";
import { EditNames } from "./user-settings/EditNames";
import { PickGenres } from "./user-settings/PickGenres";
// import {  } from "react";

interface UserOnBoardingProps {}

export const UserOnBoarding: React.FC<UserOnBoardingProps> = ({}) => {
  const [next, setNext] = useState(true);
  return (
    <Swiper loop={false} style={styles.wrapper} showsButtons={next}>
      <View style={styles.slide1}>
        <View>
          <Caption>Welcome to OnTheAux*</Caption>
        </View>
      </View>
      <View style={styles.slide2}>
        <EditNames setNext={setNext} />
      </View>
      <View style={styles.slide3}>
        <PickGenres />
      </View>
      <View style={styles.slide4}>
        <Caption>Hello 1</Caption>
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
