import React from "react";
import { Button } from "react-native-paper";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StackHeaderProps, StackNavigationProp } from "@react-navigation/stack";

interface UserButtonProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

export const UserButton: React.FC<UserButtonProps> = ({ navigation }) => {
  return (
    <Button
      mode="text"
      onPress={async () => {
        console.log("user button press");
        navigation.navigate("UserPage");
      }}>
      User
    </Button>
  );
};
