import React, { useState } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { Caption, Card, Title, Searchbar, Button } from "react-native-paper";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import Swiper from "react-native-swiper/src";
import { ArtistSearchType } from "../../search/search-types/ArtistSearchType";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
interface SettingsViewProps {}

export const SettingsView: React.FC<HomeStackNavProps<"SettingsPage">> = ({
  navigation,
  route,
}) => {
  return (
    <StyledColumnView>
      <Title>Edit Name</Title>
      <Title>Edit Username</Title>
      <Button onPress={() => navigation.navigate("EditTopFivePage")}>
        Edit Top Five
      </Button>
    </StyledColumnView>
  );
};
