import React from "react";
import { Center } from "../../../styled-components/Center";
import { Text } from "react-native";
import { CreatePostView } from "../../../modules/CreatePostView";

interface CreatePostStackProps {}
// more stuff will go here!!!

export const CreatePostStack: React.FC<CreatePostStackProps> = ({}) => {
  return <CreatePostView />;
};
