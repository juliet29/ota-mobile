import React from "react";
import { Text, View } from "react-native";
import { Center } from "./Center";

interface RegisterViewProps {}

export const RegisterView: React.FC<RegisterViewProps> = ({}) => {
  return (
    <View>
      <Center>
        <Text>hello </Text>
      </Center>
    </View>
  );
};
