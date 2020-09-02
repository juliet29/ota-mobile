import React from "react";
import { SafeAreaView, View, ImageBackground } from "react-native";
import { blueA800 } from "../../../styled-components/colors";
import { Title } from "react-native-paper";
import { UserButton } from "../../../modules/user/UserButton";
import { SearchButton } from "../../../modules/search/SearchButton";
import {
  StackNavigationProp,
  StackHeaderTitleProps,
} from "@react-navigation/stack";
import { styles } from "../../../styled-components/StyleSheet";

interface HeaderProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
  title: string | ((props: StackHeaderTitleProps) => React.ReactNode);
}
// TODO: back button?
export const Header: React.FC<HeaderProps> = ({ navigation, title }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: blueA800,
      }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 20,
        }}>
        <Title>{title}</Title>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
          <UserButton navigation={navigation} />
          <SearchButton navigation={navigation} />
        </View>

        {/* <LogoutButton /> */}
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};
