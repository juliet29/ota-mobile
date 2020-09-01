import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { DefaultTheme } from "styled-components";
import {
  indigo900,
  grey500,
  blueA800,
  deepPurpleA700,
  orange700,
  indigoA700,
  grey300,
  grey200,
  cyan400,
} from "./colors";

export const theme = {
  ...PaperDefaultTheme,
  roundness: 40,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: deepPurpleA700,
    accent: orange700,
    surface: blueA800,
    text: grey300,
  },
  fonts: {
    ...PaperDefaultTheme.fonts,
    regular: { fontFamily: "Arial" },
  },
};

// STYLED COMPONENTS THEME

export interface ThemeInterface extends DefaultTheme {}
// need to change the DefaultTheme interface in  ../types/styled.d.ts

export const SCtheme: ThemeInterface = {
  colors: {
    background: blueA800,
    accent: orange700,
    accentTwo: cyan400,
    text: grey200,
    darkText: grey500,
  },
};
