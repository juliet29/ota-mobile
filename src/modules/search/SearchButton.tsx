import React from "react";
import { Button } from "react-native-paper";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StackHeaderProps, StackNavigationProp } from "@react-navigation/stack";

interface SearchButtonProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ navigation }) => {
  return (
    <Button
      mode="contained"
      onPress={async () => {
        console.log("search button press");
        navigation.navigate("SearchPage");
      }}>
      Search
    </Button>
  );
};
