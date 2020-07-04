import React from "react";
import { FlatList, View } from "react-native";
import { Card, Button, Text, Headline, Caption } from "react-native-paper";
import { useStoreState } from "../../state-management/hooks";
import { SearchSpotifyQuery } from "../../generated-components/apolloComponents";

interface SearchFlatListsProps {
  data: SearchSpotifyQuery | undefined;
}

export const SearchFlatLists: React.FC<SearchFlatListsProps> = (data) => {
  const searchResult = data.data?.search;

  if (searchResult?.__typename === "ArtistSearchResult")
    return (
      <FlatList
        data={searchResult.artists?.items}
        renderItem={(results) => (
          <Card>
            <Headline>{results.item?.name}</Headline>
            <Caption>{results.item?.type}</Caption>
          </Card>
        )}
      />
    );
  if (searchResult?.__typename === "TrackSearchResult") {
    console.log("hello");
    return (
      <FlatList
        data={searchResult.tracks?.items}
        keyExtractor={(item, index) => item!?.id!?.toString() + index}
        renderItem={(results) => (
          <Card>
            <Headline>{results.item?.name}</Headline>
            <Caption>{results.item?.artists?.length}</Caption>
            {results.item?.artists?.map((element, ix) => (
              <Caption key={ix}>{element?.name}</Caption>
            ))}
          </Card>
        )}
      />
    );
  }

  if (searchResult?.__typename === "AlbumSearchResult")
    return (
      <FlatList
        data={searchResult.albums?.items}
        renderItem={(results) => (
          <Card>
            <Headline>{results.item?.name}</Headline>
            <Caption>{results.item?.artists}</Caption>
          </Card>
        )}
      />
    );
  return <View></View>;
};
