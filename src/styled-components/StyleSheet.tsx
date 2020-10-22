import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";
import { blueA800, deepPurple900 } from "./colors";
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

  imageBackdrop: {
    ...Platform.select({
      ios: {
        shadowColor: deepPurple900,
        shadowOffset: { width: 0.5, height: 5 },
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
