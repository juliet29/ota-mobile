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
import { ArtistSearchType } from "./search-types/ArtistSearchType";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { TrackSearchType } from "./search-types/TrackSearchType";
import { ScrollView } from "react-native-gesture-handler";
import { AlbumSearchType } from "./search-types/AlbumSearchType";
import { PostSearchType } from "./search-types/PostSearchType";
import { UserSearchType } from "./search-types/UserSearchType";
import { ImageBackground } from "react-native";
import { styles } from "../../styled-components/StyleSheet";

interface SearchViewProps {}

export const SearchView: React.FC<HomeStackNavProps<"SearchPage">> = ({
  navigation,
  route,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
      <ScrollView>
        <StyledColumnView>
          <Searchbar
            placeholder="Search"
            onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
            value={searchQuery}
          />
          {searchQuery ? (
            <StyledColumnView>
              <ArtistSearchType
                searchQuery={searchQuery}
                navigation={navigation}
                route={route}
              />
              <TrackSearchType
                searchQuery={searchQuery}
                navigation={navigation}
                route={route}
              />
              <AlbumSearchType
                searchQuery={searchQuery}
                navigation={navigation}
                route={route}
              />

              <PostSearchType
                searchQuery={searchQuery}
                navigation={navigation}
                route={route}
              />

              <UserSearchType
                searchQuery={searchQuery}
                navigation={navigation}
                route={route}
              />
            </StyledColumnView>
          ) : (
            <></>
          )}
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};
