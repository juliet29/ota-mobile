// Displaying search results for the different content types
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, View } from "react-native";
import {
  Caption,
  Card,
  Headline,
  List,
  Text,
  ActivityIndicator,
  Avatar,
  Subheading,
  Title,
} from "react-native-paper";
import {
  SearchSpotifyQuery,
  useSearchSpotifyQuery,
} from "../../generated-components/apolloComponents";
import { useStoreActions, useStoreState } from "../../state-management/hooks";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";

interface SearchTypeProps {
  searchQuery: string;
}

export const ArtistSearchType: React.FC<
  SearchTypeProps & HomeStackNavProps<"SearchPage">
> = ({ searchQuery, navigation, route }) => {
  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: "artist",
      query: searchQuery,
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    // console.log(error);
    return <></>;
  }
  const searchResult = data?.search;
  if (searchResult?.__typename === "ArtistSearchResult") {
    return (
      <StyledColumnView>
        <Title>Artists</Title>
        <FlatList
          data={searchResult.artists?.items}
          keyExtractor={(item, index) => item!?.id!?.toString() + index}
          renderItem={(results) => (
            <List.Item
              onPress={() => {
                navigation.navigate("ArtistPage", {
                  id: results.item?.id,
                  name: results.item?.name,
                  imageUrl: results.item?.images?.map((item, ix) => {
                    return item?.url;
                  })[1],
                });
              }}
              title={results.item?.name}
              left={(props) => (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: `${
                      results.item?.images?.map((item, ix) => {
                        return item?.url;
                      })[1]
                    }`,
                  }}
                />
              )}
            />
          )}
        />
      </StyledColumnView>
    );
  }
};
