import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { PostParamList } from "../shared/PostParamList";
import { GetOtherUserQuery } from "../../../generated-components/apolloComponents";

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
  UserPage: { id: number };
  SearchPage: undefined;
  SettingsPage: undefined;
  EditTopFivePage: undefined;
  CommentPage: {
    postId: number;
    postType: string;
    contentId: string;
    name: string;
    imageUrl?: string;
  };
  FollowersPage: { id: number; request: "following" | "followers" };
} & PostParamList;

export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
