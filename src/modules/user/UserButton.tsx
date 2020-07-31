import React from "react";
import { Button } from "react-native-paper";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StackHeaderProps, StackNavigationProp } from "@react-navigation/stack";
import { useStoreState } from "../../state-management/hooks";

interface UserButtonProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

export const UserButton: React.FC<UserButtonProps> = ({ navigation }) => {
  const userState = useStoreState((state) => state.user.user);
  return (
    <Button
      mode="contained"
      onPress={async () => {
        console.log("user button press");
        navigation.navigate("UserPage", { id: userState.id });
      }}>
      User
    </Button>
  );
};
