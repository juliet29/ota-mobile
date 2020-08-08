import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Chip, Searchbar, Title } from "react-native-paper";
import { TopFiveArrayType, TopFiveEditProps } from "../../UserTopFiveView";
import { AlbumTopFiveQuery } from "./AlbumTopFiveQuery";

export const AlbumTopFiveEdit: React.FC<TopFiveEditProps> = ({
  array,
  setArray,
  searchQuery,
  setSearchQuery,
  arrayIndex,
  setShowSearch,
  type,
}) => {
  // useEffect(() => {
  //   // console.log("useeffects array", topFiveArray);
  // }, [array]);

  return (
    <View>
      <Searchbar
        placeholder="Search top albums"
        onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
        value={searchQuery}
      />
      <AlbumTopFiveQuery
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        array={array}
        setArray={setArray}
        arrayIndex={arrayIndex}
        setShowSearch={setShowSearch}
        type={type}
      />
    </View>
  );
};
