import React from "react";
import { Center } from "./Center";
import { Text } from "react-native";

interface HomeStackProps {}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Center>
      <Text>Hi i'm the home page!</Text>
    </Center>
  );
};
