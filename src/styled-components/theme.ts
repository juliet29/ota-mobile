import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  indigo900,
  grey500,
  blueA800,
  deepPurpleA700,
  orange700,
  indigoA700,
  grey300,
  grey200,
} from "./colors";

export const theme = {
  ...PaperDefaultTheme,
  roundness: 40,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: deepPurpleA700,
    accent: orange700,
    surface: blueA800,
    text: grey200,
  },
  fonts: {
    ...PaperDefaultTheme.fonts,
    regular: { fontFamily: "Arial" },
  },
};

import { DefaultTheme } from "styled-components";

// STYLED COMPONENTS THEME
// const colors: {
// background: string;
// accent: string;
// text: string;
// }
// export interface ThemeInterface {
//  colors: {
//     background: string;
//     accent: string;
//     text: string;
//     } }

export interface ThemeInterface extends DefaultTheme {}
// need to change the DefaultTheme interface in  ../types/styled.d.ts

export const SCtheme: ThemeInterface = {
  colors: {
    background: blueA800,
    accent: orange700,
    text: grey200,
    darkText: grey500,
  },
};
