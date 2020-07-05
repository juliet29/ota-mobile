import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import {
  Button,
  Card,
  Searchbar,
  Headline,
  Caption,
  Title,
  ActivityIndicator,
} from "react-native-paper";
import {
  useSearchSpotifyQuery,
  SearchSpotifyQuery,
  SearchSpotifyQueryVariables,
} from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
import { useNavigation } from "@react-navigation/native";
import { SearchFlatLists } from "./SearchFlatLists";

interface AddContentToPostProps {}

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
  // TODO: dont search if no data

  return (
    <Wrapper style={{ backgroundColor: "white" }}>
      <StyledColumnView>
        <Title>SEARCH {postType.toUpperCase()}S</Title>
        <Searchbar
          placeholder="Search"
          onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
          value={searchQuery}
        />
        {error ? (
          <Text></Text>
        ) : !data ? (
          <StyledColumnView>
            <ActivityIndicator size="large" />
          </StyledColumnView>
        ) : (
          <SearchFlatLists data={data} />
        )}

        <Button onPress={() => navigation.goBack()}>Dismiss</Button>
      </StyledColumnView>
    </Wrapper>
  );
};
