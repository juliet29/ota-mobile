import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import {
  indigo900,
  grey500,
  blueA800,
  deepPurpleA700,
  orange700,
  indigoA700,
} from "./colors";

export const theme = {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: deepPurpleA700,
    accent: orange700,
    surface: blueA800,
    text: grey500,
  },
  fonts: {
    ...PaperDefaultTheme.fonts,
    regular: { fontFamily: "Arial" },
  },
};

export interface ThemeInterface {
  colors: {
    background: string;
  };
}

export const SCtheme: ThemeInterface = {
  colors: {
    background: blueA800,
  },
};
