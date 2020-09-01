import React from "react";
import styled from "styled-components/native";
import { ThemeInterface } from "./theme";
import { View, Image } from "react-native";
import { blueA800 } from "./colors";
// import { TextInput } from "react-native-paper";
import { TextInput } from "react-native";
// import WavyBackground from "../../assets/WavyBackground.png";
// import blueA800 from "./colors";
// /* background-color: ${(props) => props.theme.colors.background}; */

// most basic wrapper to be used on all pages
export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  /* background-color: ${(props) => props.theme.colors.background}; */
`;

// good for forms and columns
export const StyledColumnView = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  margin: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const LineBreak = styled.View`
  height: 30px;
  width: 100%;
`;

export const AuthTextInput = styled(TextInput)`
  border-radius: 40px;
  background-color: rgba(90, 90, 90, 0.01);
  border-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.text};
  border-width: 0.5px;
  padding: 15px;
`;
/* height: 100px;  {`${(props) => props.theme.colors.text}`}*/
