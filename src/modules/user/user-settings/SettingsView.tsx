import React from "react";
import { Button, Title } from "react-native-paper";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";

interface SettingsViewProps {}

export const SettingsView: React.FC<HomeStackNavProps<"SettingsPage">> = ({
  navigation,
  route,
}) => {
  const pickImage = async () => {
    try {
      let imageResult = await ImagePicker.launchImageLibraryAsync({});
      if (imageResult.cancelled === false) {
        console.log("img res", imageResult);
        const file = new ReactNativeFile({
          uri: imageResult.uri,
          type: imageResult.type,
          name: "picture",
        });
        console.log("file", file);
      }
    } catch (err) {
      console.log("err picking img", err);
    }
  };

  return (
    <StyledColumnView>
      <Title>Edit Name</Title>
      <Title>Edit Username</Title>
      <Button
        onPress={() => {
          pickImage();
        }}>
        Change Profile Picture
      </Button>
      <Button onPress={() => navigation.navigate("UserOnBoarding")}>
        User OnBoarding (move later)
      </Button>
    </StyledColumnView>
  );
};
