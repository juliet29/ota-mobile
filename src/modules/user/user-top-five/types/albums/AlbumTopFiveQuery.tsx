// Displaying search results for the different content types
import React from "react";
import { FlatList, Dimensions, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  List,
  Title,
  Searchbar,
} from "react-native-paper";
import { useSearchSpotifyQuery } from "../../../../../generated-components/apolloComponents";
import { StyledColumnView } from "../../../../../styled-components/ReusedUI";
import { TopFiveArrayType } from "../../UserTopFiveView";
// import { TopFiveArrayType } from "../../../user-settings/settings-top-five/TopFiveSwiper";

interface TopFiveQueryProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  array: TopFiveArrayType[];
  setArray: React.Dispatch<React.SetStateAction<TopFiveArrayType[]>>;
  arrayIndex: number;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}
let screenHeight = Dimensions.get("window").height;
export const AlbumTopFiveQuery: React.FC<TopFiveQueryProps> = ({
  searchQuery,
  setSearchQuery,
  arrayIndex,
  array,
  setArray,
  setShowSearch,
  type,
}) => {
  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type,
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
  console.log(searchResult);
  if (searchResult?.__typename) {
    return (
      <View style={{ height: screenHeight / 2 }}>
        {searchResult?.__typename === "AlbumSearchResult" ? (
          <FlatList
            data={searchResult.albums?.items}
            keyExtractor={(item, index) => item!?.id!?.toString() + index}
            renderItem={(results) => (
              <List.Item
                onPress={() => {
                  console.log("press item", results.item.name);
                  console.log("query index", arrayIndex.valueOf);

                  setArray(
                    Object.assign([...array], {
                      [arrayIndex]: {
                        id: results.item?.id,
                        name: results.item?.name,
                        imageUrl: results.item?.images?.map((item, ix) => {
                          return item?.url;
                        })[1],
                      },
                    })
                  );
                  setSearchQuery("");
                  setShowSearch(false);
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
        ) : searchResult?.__typename === "TrackSearchResult" ? (
          <FlatList
            data={searchResult.tracks?.items}
            keyExtractor={(item, index) => item!?.id!?.toString() + index}
            renderItem={(results) => (
              <List.Item
                onPress={() => {
                  console.log("press item", results.item.name);
                  console.log("query index", arrayIndex.valueOf);

                  setArray(
                    Object.assign([...array], {
                      [arrayIndex]: {
                        id: results.item?.id,
                        name: results.item?.name,
                        imageUrl: results.item?.album.images?.map(
                          (item, ix) => {
                            return item?.url;
                          }
                        )[1],
                      },
                    })
                  );
                  setSearchQuery("");
                  setShowSearch(false);
                }}
                title={results.item?.name}
                left={(props) => (
                  <Avatar.Image
                    size={20}
                    source={{
                      uri: `${
                        results.item?.album.images?.map((item, ix) => {
                          return item?.url;
                        })[1]
                      }`,
                    }}
                  />
                )}
              />
            )}
          />
        ) : searchResult?.__typename === "ArtistSearchResult" ? (
          <FlatList
            data={searchResult.artists?.items}
            keyExtractor={(item, index) => item!?.id!?.toString() + index}
            renderItem={(results) => (
              <List.Item
                onPress={() => {
                  console.log("press item", results.item.name);
                  console.log("query index", arrayIndex.valueOf);

                  setArray(
                    Object.assign([...array], {
                      [arrayIndex]: {
                        id: results.item?.id,
                        name: results.item?.name,
                        imageUrl: results.item?.images?.map((item, ix) => {
                          return item?.url;
                        })[1],
                      },
                    })
                  );
                  setSearchQuery("");
                  setShowSearch(false);
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
        ) : (
          <></>
        )}
      </View>
    );
  }
};
