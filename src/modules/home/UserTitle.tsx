import React from "react";
import { List, Avatar } from "react-native-paper";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Scalars } from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { useNavigation } from "@react-navigation/native";

interface UserTitleProps {
  username: string;
  timeSubmitted: Scalars["DateTime"];
  userId?: number;
  userImage: string;
  avatarSize: number;
}

export const UserTitle: React.FC<UserTitleProps> = ({
  userId,
  username,
  userImage,
  timeSubmitted,
  avatarSize,
}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  console.log("usertitle", username);
  return (
    <List.Item
      style={{ paddingLeft: 0 }}
      title={username}
      titleStyle={{ fontWeight: "bold" }}
      description={timeSubmitted}
      descriptionStyle={{ color: themeContext.colors.accentTwo }}
      onPress={() => {
        navigation.navigate("UserPage", { id: userId });
      }}
      left={(props) => (
        <Avatar.Image
          size={avatarSize}
          source={{
            uri: `${userImage}`,
          }}
        />
      )}
    />
  );
};
