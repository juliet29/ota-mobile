// Displaying search results for the different content types
import React from "react";
import { FlatList } from "react-native";
import { ActivityIndicator, Avatar, List, Title } from "react-native-paper";
import { useSearchSpotifyQuery } from "../../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../../styled-components/ReusedUI";

interface SearchTypeProps {
  searchQuery: string;
}

export const TrackSearchType: React.FC<
  SearchTypeProps & HomeStackNavProps<"SearchPage">
> = ({ searchQuery, navigation, route }) => {
  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: "track",
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
  if (searchResult?.__typename === "TrackSearchResult") {
    return (
      <StyledColumnView>
        <Title>Tracks</Title>
        <FlatList
          data={searchResult.tracks?.items}
          keyExtractor={(item, index) => item!?.id!?.toString() + index}
          renderItem={(results) => (
            <List.Item
              onPress={() => {
                navigation.navigate("TrackPage", {
                  id: results.item?.id,
                  name: results.item?.name,
                  artistNames: results.item?.artists?.map((item, ix) => {
                    return item?.name;
                  }),
                  imageUrl: results.item?.album?.images?.map((item, ix) => {
                    return item?.url;
                  })[1],
                });
              }}
              title={results.item?.name}
              description={results.item?.artists?.map((item, ix) => {
                return item?.name;
              })}
              left={(props) => (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: `${
                      results.item?.album?.images?.map((item, ix) => {
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
