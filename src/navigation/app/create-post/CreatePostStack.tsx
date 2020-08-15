import React from "react";
import { CreatePostView } from "../../../modules/create-post/CreatePostView";
import { CreatePostParamList } from "./CreatePostParamList";
import { createStackNavigator } from "@react-navigation/stack";
import { AddContentToPost } from "../../../modules/create-post/AddContentToPost";
import { CreatePoll } from "../../../modules/create-post/polls/CreatePoll";

interface CreatePostStackProps {}

const Stack = createStackNavigator<CreatePostParamList>();

export const CreatePostStack: React.FC<CreatePostStackProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="CreatePost">
      <Stack.Screen name="CreatePost" component={CreatePostView} />
      <Stack.Screen name="AddContentToPost" component={AddContentToPost} />
      <Stack.Screen name="CreatePoll" component={CreatePoll} />
    </Stack.Navigator>
  );
};
