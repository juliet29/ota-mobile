import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { Button, Card, Searchbar } from "react-native-paper";
import {
  useSearchSpotifyQuery,
  SearchSpotifyQuery,
  SearchSpotifyQueryVariables,
} from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
import { useNavigation } from "@react-navigation/native";

interface AddContentToPostProps {}

function filterSearchResults(someData: SearchSpotifyQuery) {
  return someData?.search?.__typename === "ArtistSearchResult"
    ? someData?.search?.artists?.items
    : someData?.search?.__typename === "TrackSearchResult"
    ? someData?.search?.tracks?.items
    : someData?.search?.__typename === "AlbumSearchResult"
    ? someData?.search?.albums?.items
    : null;
}

export const AddContentToPost: React.FC<AddContentToPostProps> = ({}) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const postType = useStoreState((state) => state.createPost.postType);
  const refinedSearchQuery = searchQuery.length > 1 ? searchQuery : "";

  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: postType,
      query: refinedSearchQuery,
    },
  });
  // console.log(data);
  // console.log(data?.search?.__typename);

  const searchResults = data ? filterSearchResults(data) : null;
  // TODO: handle errors

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
          <FlatList
            // @ts-ignore
            //  TODO: fix types here
            data={searchResults}
            renderItem={(results) => (
              <Card>
                <Button>{results.item?.name}</Button>
              </Card>
            )}
          />
        )}

        <Button onPress={() => navigation.goBack()}>Dismiss</Button>
      </StyledColumnView>
    </Wrapper>
  );
};
