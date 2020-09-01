import { View, Image, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { blueA800 } from "./colors";
import { useTheme } from "react-native-paper";
// const { colors } = useTheme();
export const styles = StyleSheet.create({
  // BACKGROUND IMAGE
  wavyBackgroundStyle: {
    backgroundColor: blueA800,
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
  },

  wavyBackgroundImageStyle: {
    resizeMode: "cover",
    height: 600,
    opacity: 0.3,
  },
});
