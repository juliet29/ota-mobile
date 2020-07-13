import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { PostParamList } from "../shared/PostParamList";

export type HomeParamList = {
  Feed: undefined;
  ArtistPage: { artistId?: string };
} & PostParamList;

export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
