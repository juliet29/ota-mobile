// Displaying search results for the different content types
import React from "react";
import { FlatList } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  List,
  Title,
  Caption,
  Card,
} from "react-native-paper";
import {
  useSearchSpotifyQuery,
  useSearchPostsQuery,
  useSearchUserQuery,
} from "../../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { emptyImage } from "../../user/UserView";

interface SearchTypeProps {
  searchQuery: string;
}

export const UserSearchType: React.FC<
  SearchTypeProps & HomeStackNavProps<"SearchPage">
> = ({ searchQuery, navigation, route }) => {
  const { data, loading, error } = useSearchUserQuery({
    variables: {
      query: searchQuery,
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    return <></>;
  }

  const searchResult = data?.searchUser;

  return (
    <StyledColumnView>
      <Title>Users</Title>
      <FlatList
        data={searchResult}
        keyExtractor={(item, index) => item!?.id!?.toString() + index}
        renderItem={(results) => (
          <List.Item
            title={results.item?.username}
            onPress={() => {
              navigation.navigate("UserPage", { id: +results.item.id });
            }}
            left={(props) => (
              <Avatar.Image
                size={20}
                source={{
                  uri: `${
                    results.item.profilePicture
                      ? results.item.profilePicture
                      : emptyImage
                  }`,
                }}
              />
            )}
          />
        )}
      />
    </StyledColumnView>
  );
};
