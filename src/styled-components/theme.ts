import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { DefaultTheme } from "styled-components";
import {
  indigo900,
  grey500,
  deepPurpleA700,
  orange700,
  indigoA700,
  grey300,
  grey200,
  cyan400,
  blueA700,
  blueA900,
  blueA800,
  deepPurple900,
  deepPurple800,
} from "./colors";

export const theme = {
  ...PaperDefaultTheme,
  roundness: 40,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: deepPurple800,
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
/*
import { useContext } from "react";
import { ThemeContext } from "styled-components";
const themeContext = useContext(ThemeContext); 
*/

export const SCtheme: ThemeInterface = {
  colors: {
    background: blueA800,
    backgroundContrast: blueA900,
    primary: deepPurple800,
    accent: orange700,
    accentTwo: cyan400,
    text: grey200,
    darkText: grey500,
    transparent: "rgba(10, 17, 96, 0.01)",
  },
};
