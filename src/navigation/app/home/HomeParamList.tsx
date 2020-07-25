import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { PostParamList } from "../shared/PostParamList";

export type HomeParamList = {
  Feed: undefined;
  ArtistPage: { id: string; name: string; imageUrl?: string };
  ArtistPosts: { id: string; name: string };
  AlbumPage: { id: string; name: string; imageUrl?: string };
  TrackPage: {
    id: string;
    name: string;
    artistNames: string[];
    imageUrl?: string;
  };
  UserPage: undefined;
  SearchPage: undefined;
  SettingsPage: undefined;
  EditTopFivePage: undefined;
} & PostParamList;

export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
