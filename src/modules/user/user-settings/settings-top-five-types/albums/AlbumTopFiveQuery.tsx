// Displaying search results for the different content types
import React from "react";
import { FlatList } from "react-native";
import { ActivityIndicator, Avatar, List, Title } from "react-native-paper";
import { useSearchSpotifyQuery } from "../../../../../generated-components/apolloComponents";
import { StyledColumnView } from "../../../../../styled-components/ReusedUI";
import { TopFiveArrayType } from "../../TopFiveSwiper";

interface TopFiveQueryProps {
  searchQuery: string;
  array: TopFiveArrayType[];
  setArray: React.Dispatch<React.SetStateAction<TopFiveArrayType[]>>;
}

export const AlbumTopFiveQuery: React.FC<TopFiveQueryProps> = ({
  searchQuery,
  array,
  setArray,
}) => {
  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: "album",
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
  if (searchResult?.__typename === "AlbumSearchResult") {
    return (
      <StyledColumnView>
        <Title>Album</Title>
        <FlatList
          data={searchResult.albums?.items}
          keyExtractor={(item, index) => item!?.id!?.toString() + index}
          renderItem={(results) => (
            <List.Item
              onPress={() => {
                setArray((array) => [
                  ...array,
                  {
                    id: results.item?.id,
                    name: results.item?.name,
                    imageUrl: results.item?.images?.map((item, ix) => {
                      return item?.url;
                    })[1],
                  },
                ]);
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
