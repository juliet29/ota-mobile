import React from "react";
import { Center } from "../../../global-ui/Center";
import { Text } from "react-native";

interface CreatePostStackProps {}

export const CreatePostStack: React.FC<CreatePostStackProps> = ({}) => {
  return (
    <Center>
      <Text>Hi i'm the create post page!</Text>
    </Center>
  );
};
