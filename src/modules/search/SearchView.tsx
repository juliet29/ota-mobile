import React, { useState } from "react";
import {
  Caption,
  Card,
  Searchbar,
  ActivityIndicator,
} from "react-native-paper";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { useSearchSpotifyQuery } from "../../generated-components/apolloComponents";
import { SearchFlatLists } from "../create-post/SearchFlatLists";
import { ArtistSearchType } from "./SearchTypes";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";

interface SearchViewProps {}

export const SearchView: React.FC<HomeStackNavProps<"SearchPage">> = ({
  navigation,
  route,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: "artist",
      query: searchQuery,
    },
  });

  return (
    <StyledColumnView>
      <Searchbar
        placeholder="Search"
        onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
        value={searchQuery}
      />

      <ArtistSearchType
        searchQuery={searchQuery}
        navigation={navigation}
        route={route}
      />
    </StyledColumnView>
  );
};
