import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  Title,
  ActivityIndicator,
  Chip,
  Avatar,
} from "react-native-paper";
import {
  GetOtherUserDocument,
  TopFiveArrayInput,
  TopFiveInput,
  useUpdateUserTopFiveMutation,
  useGetOtherUserQuery,
} from "../../../../../generated-components/apolloComponents";
import { StyledColumnView } from "../../../../../styled-components/ReusedUI";
import { TypeDisplay } from "../../TypeDisplay";
import { TopFiveArrayType, TopFiveWrapperProps } from "../../UserTopFiveView";
import { AlbumTopFiveEdit } from "./AlbumTopFiveEdit";
import { useStoreState } from "../../../../../state-management/hooks";
import { Caption } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { array } from "yup";
import { View } from "react-native";

export const AlbumTopFiveWrapper: React.FC<TopFiveWrapperProps> = ({ id }) => {
  const [array, setArray] = useState(Array<TopFiveArrayType>());
  // console.log("id", id);

  const { data, loading, error } = useGetOtherUserQuery({
    variables: {
      id,
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    // console.log(error);
    return <></>;
  }

  // // process the top five
  // let topAlbums = data.getOtherUser.topAlbums;
  // console.log(topAlbums.length);
  // if (topAlbums.length > 5) {
  //   console.log("g than 5 ");
  //   let topAlbums5 = topAlbums.slice(0, 5);
  // }

  useEffect(() => {
    console.log("data", data);
    if (data && data.getOtherUser.topAlbums) {
      // might want to switch to get last 5 items in list ...
      const topAlbums = data.getOtherUser.topAlbums.slice(0, 5);
      console.log("top albums length:", topAlbums.length);
      if (topAlbums.length < 5) {
        const emptyNum = 5 - topAlbums.length;
        console.log("empty num", emptyNum);
        const topAlbumsWithEmpty = topAlbums.concat(
          new Array<TopFiveArrayType>(emptyNum).fill({})
        );
        console.log(topAlbumsWithEmpty);
        setArray(topAlbumsWithEmpty);
        return;
      }
      setArray(topAlbums);
    }
  }, [data]);

  return (
    <StyledColumnView>
      <FlatList
        data={array}
        keyExtractor={(item, index) => index.toString() + item}
        renderItem={({ item, index }) => (
          <View>
            {item.name ? (
              <Chip
                avatar={
                  <Avatar.Image
                    size={30}
                    source={{
                      uri: `${item.imageUrl}`,
                    }}
                  />
                }
                onClose={() => {
                  console.log("chip closed", index);
                  array[index] = {};
                  setArray(Object.assign([...array], { index: {} }));
                }}>
                {item.name}
              </Chip>
            ) : (
              <Caption>Empty Slot </Caption>
            )}
          </View>
        )}
      />
    </StyledColumnView>
  );
};
