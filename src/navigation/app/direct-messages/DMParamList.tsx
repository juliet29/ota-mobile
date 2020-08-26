import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type DMParamList = {
  DMFeed: undefined;
  DMChat: { partnerId: number };
};

export type DMStackNavProps<T extends keyof DMParamList> = {
  navigation: StackNavigationProp<DMParamList, T>;
  route: RouteProp<DMParamList, T>;
};
