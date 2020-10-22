import React from "react";
import { Button, Avatar } from "react-native-paper";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StackHeaderProps, StackNavigationProp } from "@react-navigation/stack";
import { useStoreState } from "../../state-management/hooks";
import { TouchableOpacity } from "react-native-gesture-handler";

interface UserButtonProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

export const UserButton: React.FC<UserButtonProps> = ({ navigation }) => {
  const userState = useStoreState((state) => state.user.user);
  return (
    <TouchableOpacity
      onPress={async () => {
        console.log("user button press");
        navigation.navigate("UserPage", { id: userState.id });
      }}>
      <Avatar.Image
        size={24}
        source={{
          uri: `${userState.profilePicture}`,
        }}
      />
    </TouchableOpacity>
  );
};
