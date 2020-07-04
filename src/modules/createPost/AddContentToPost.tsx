import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { Button, Card, Searchbar, Headline, Caption } from "react-native-paper";
import {
  useSearchSpotifyQuery,
  SearchSpotifyQuery,
  SearchSpotifyQueryVariables,
} from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
import { useNavigation } from "@react-navigation/native";
import { SearchFlatLists } from "./searchFlatLists";

interface AddContentToPostProps {}

function filterSearchResults(someData: SearchSpotifyQuery) {
  return someData?.search?.__typename === "ArtistSearchResult"
    ? someData?.search?.artists?.items
    : someData?.search?.__typename === "TrackSearchResult"
    ? someData?.search?.tracks?.items
    : someData?.search?.__typename === "AlbumSearchResult"
    ? someData?.search?.albums?.items
    : undefined;
}

export const AddContentToPost: React.FC<AddContentToPostProps> = ({}) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const postType = useStoreState((state) => state.createPost.postType);

  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: postType,
      query: searchQuery,
    },
  });

  const searchResults = data ? filterSearchResults(data) : null;
  // TODO: dont search if no data

  return (
    <Wrapper style={{ backgroundColor: "white" }}>
      <StyledColumnView>
        <Searchbar
          placeholder="Search"
          onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
          value={searchQuery}
        />
        {loading ? (
          <Card>
            <Text>Loading</Text>
          </Card>
        ) : error ? (
          <Text></Text>
        ) : (
          <SearchFlatLists data={data} />
          // <FlatList
          //   // @ts-ignore
          //   //  TODO: fix types here
          //   data={searchResults}
          //   renderItem={(results) => (
          //     <Card>
          //       <Headline>{results.item?.name}</Headline>
          //     </Card>
          //   )}
          // />
        )}

        <Button onPress={() => navigation.goBack()}>Dismiss</Button>
      </StyledColumnView>
    </Wrapper>
  );
};
