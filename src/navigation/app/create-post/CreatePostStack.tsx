import React from "react";
import { CreatePostView } from "../../../modules/create-post/CreatePostView";
import { CreatePostParamList } from "./CreatePostParamList";
import { createStackNavigator } from "@react-navigation/stack";
import { AddContentToPost } from "../../../modules/create-post/AddContentToPost";
import { CreatePoll } from "../../../modules/create-post/polls/CreatePoll";
import { CreatePlaylist } from "../../../modules/create-post/playlists/CreatePlaylist";
import { UserButton } from "../../../modules/user/UserButton";
import { SearchButton } from "../../../modules/search/SearchButton";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { HomeStackNavProps } from "../home/HomeParamList";
import { Header } from "../header/Header";

interface CreatePostStackProps {}

const Stack = createStackNavigator<CreatePostParamList>();

export const CreatePostStack: React.FC<
  CreatePostStackProps & HomeStackNavProps<"Feed">
> = ({ navigation }) => {
  // const navigation = useNavigation()
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return <Header navigation={navigation} title={title} />;
        },
      }}
      initialRouteName="CreatePost">
      <Stack.Screen name="CreatePost" component={CreatePostView} />
      <Stack.Screen name="AddContentToPost" component={AddContentToPost} />
      <Stack.Screen name="CreatePoll" component={CreatePoll} />
      <Stack.Screen name="CreatePlaylist" component={CreatePlaylist} />
    </Stack.Navigator>
  );
};
