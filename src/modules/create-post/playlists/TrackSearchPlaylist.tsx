// Displaying search results for the different content types
import React from "react";
import { FlatList } from "react-native";
import { ActivityIndicator, Avatar, List, Title } from "react-native-paper";
import { useSearchSpotifyQuery } from "../../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { PlaylistItemType } from "./CreatePlaylist";

interface SearchTypeProps {
  searchQuery: string;
  array: PlaylistItemType[];
  setArray: React.Dispatch<React.SetStateAction<PlaylistItemType[]>>;
}

export const TrackSearchPlaylist: React.FC<SearchTypeProps> = ({
  searchQuery,
  array,
  setArray,
}) => {
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
                setArray((array) => [
                  ...array,
                  {
                    name: results.item.name,
                    id: results.item.id,
                    artists: results.item.artists.map((i) => i.name),
                    externalUrl: results.item.external_urls.spotify,
                    imageUrl: results.item?.album.images?.map(
                      (item) => item?.url
                    )[1],
                  },
                ]);
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
