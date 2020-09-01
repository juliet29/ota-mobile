import React from "react";
import { Button, IconButton, useTheme } from "react-native-paper";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StackHeaderProps, StackNavigationProp } from "@react-navigation/stack";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface SearchButtonProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <IconButton
      icon="magnify"
      color={themeContext.colors.accentTwo}
      onPress={async () => {
        console.log("search button press");
        navigation.navigate("SearchPage");
      }}>
      Search
    </IconButton>
  );
};
