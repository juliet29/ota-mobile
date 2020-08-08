import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  Title,
  ActivityIndicator,
  Chip,
  Avatar,
  Surface,
  IconButton,
  Colors,
} from "react-native-paper";
import {
  GetOtherUserDocument,
  TopFiveArrayInput,
  TopFiveInput,
  useUpdateUserTopFiveMutation,
  useGetOtherUserQuery,
  TopFive,
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
import { AlbumTopFiveQuery } from "./AlbumTopFiveQuery";

export const AlbumTopFiveWrapper: React.FC<TopFiveWrapperProps> = ({
  id,
  type,
}) => {
  const userState = useStoreState((state) => state.user.user);
  const [array, setArray] = useState(Array<TopFiveArrayType>());
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [index, setIndex] = useState(-1);
  const [editMode, setEditMode] = useState(false);
  const [updateTopFive, { loading: mloading }] = useUpdateUserTopFiveMutation();
  // console.log("id", id);

  const { data, loading, error } = useGetOtherUserQuery({
    variables: {
      id,
    },
  });

  const submitUpdateTopFive = async () => {
    // make sure everything has the right type
    array.map((value) => console.log(Object.keys(value).length));
    const goodArray = array.filter((value) => Object.keys(value).length !== 0);
    console.log("goodArray", goodArray);
    const dataArray = goodArray as TopFiveInput[];
    const data: TopFiveArrayInput = {
      dataArray,
      type,
    };
    try {
      // make the mutation
      await updateTopFive({
        variables: { data },
        refetchQueries: [
          { query: GetOtherUserDocument, variables: { data: { id } } },
        ],
      });
    } catch (err) {
      console.log("error in album top five wrapper", err);
      return <Caption>Submission Failed</Caption>;
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    // console.log(error);
    return <></>;
  }

  useEffect(() => {
    console.log("DATA CHANGED 1");
    if (data && data.getOtherUser) {
      // might want to switch to get last 5 items in list ...
      const content =
        type === "track"
          ? data.getOtherUser.topTracks
          : type === "artist"
          ? data.getOtherUser.topArtists
          : type === "album"
          ? data.getOtherUser.topAlbums
          : null;

      const topAlbums = content
        ? content.slice(0, 5).map(({ __typename, ...item }) => {
            return item;
          })
        : null;

      console.log("top albums fresh DATA CHANGED", topAlbums);

      if (!topAlbums || topAlbums.length < 5) {
        const emptyNum = !topAlbums ? 5 : 5 - topAlbums.length;
        console.log("empty num", emptyNum);
        const topAlbumsWithEmpty = !topAlbums
          ? new Array(emptyNum).fill({})
          : topAlbums.concat(new Array(emptyNum).fill({}));
        console.log(topAlbumsWithEmpty);
        setArray(topAlbumsWithEmpty);
        return;
      }
      setArray(topAlbums);
    }
    console.log("final array b4 change", array);
  }, [data]);

  useEffect(() => {
    console.log("new arr", array);
  }, [array, setArray]);

  return (
    <StyledColumnView>
      {!editMode ? (
        // SIMPLE FLATLIST

        <View>
          {userState.id === id ? (
            <IconButton
              icon="circle-edit-outline"
              size={20}
              disabled={mloading}
              onPress={() => {
                console.log("edit button pressed");
                setEditMode(true);
              }}
            />
          ) : (
            <></>
          )}

          <FlatList
            data={array}
            keyExtractor={(item, index) => index.toString() + item}
            renderItem={({ item, index }) => (
              <View>
                <Chip
                  avatar={
                    <Avatar.Image
                      size={30}
                      source={{
                        uri: `${item.imageUrl}`,
                      }}
                    />
                  }>
                  {item.name}
                </Chip>
              </View>
            )}
          />
        </View>
      ) : (
        // EDIT MODE FLATLIST

        <View>
          <IconButton
            icon="content-save-all"
            size={20}
            onPress={() => {
              console.log("save button pressed");
              submitUpdateTopFive();
              setEditMode(false);
            }}
          />
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
                      setArray(Object.assign([...array], { [index]: {} }));
                    }}>
                    {item.name}
                  </Chip>
                ) : (
                  <Chip
                    icon="plus"
                    onPress={() => {
                      console.log("add");
                      setShowSearch(true);
                      setIndex(index);
                    }}>
                    New Item
                  </Chip>
                )}
              </View>
            )}
          />
        </View>
      )}
      {showSearch ? (
        <AlbumTopFiveEdit
          type={type}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          array={array}
          setArray={setArray}
          arrayIndex={index}
          setShowSearch={setShowSearch}
        />
      ) : (
        <></>
      )}
    </StyledColumnView>
  );
};
