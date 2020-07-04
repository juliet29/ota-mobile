import React from "react";
import { CreatePostView } from "../../../modules/createPost/CreatePostView";
import { CreatePostParamList } from "./CreatePostParamList";
import { createStackNavigator } from "@react-navigation/stack";
import { AddContentToPost } from "../../../modules/createPost/AddContentToPost";

interface CreatePostStackProps {}

const Stack = createStackNavigator<CreatePostParamList>();

export const CreatePostStack: React.FC<CreatePostStackProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="CreatePost">
      <Stack.Screen name="CreatePost" component={CreatePostView} />
      <Stack.Screen name="AddContentToPost" component={AddContentToPost} />
    </Stack.Navigator>
  );
};
