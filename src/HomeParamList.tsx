import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { PostParamList } from "./PostParamList";

export type HomeParamList = {
  Feed: undefined;
} & PostParamList;

export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
