import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text } from "react-native";
import {
  ActivityIndicator,
  Button,
  Searchbar,
  Title,
} from "react-native-paper";
import { useSearchSpotifyQuery } from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
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
