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
import {
  RoundImage,
  StyledColumnView,
  ThinLine,
} from "../../../../../styled-components/ReusedUI";
import { TypeDisplay } from "../../TypeDisplay";
import { TopFiveArrayType, TopFiveWrapperProps } from "../../UserTopFiveView";
import { AlbumTopFiveEdit } from "./AlbumTopFiveEdit";
import { useStoreState } from "../../../../../state-management/hooks";
import { Caption } from "react-native-paper";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { array } from "yup";
import { View, ScrollView } from "react-native";
import { AlbumTopFiveQuery } from "./AlbumTopFiveQuery";
import { BoldWhiteCaption } from "../../../../../styled-components/StylishComponents";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { emptyImage } from "../../../../home/FeedView";

export const AlbumTopFiveWrapper: React.FC<TopFiveWrapperProps> = ({
  id,
  type,
  navigation,
}) => {
  const themeContext = useContext(ThemeContext);
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
    <ScrollView horizontal={true}>
      <View
        style={{
          marginBottom: 20,
        }}>
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
              numColumns={type === "artist" ? 1 : 2}
              horizontal={type === "artist" ? true : false}
              data={array}
              key={type === "artist" ? 1 : 2}
              keyExtractor={(item, index) => index.toString() + item}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{ padding: 3 }}
                  onPress={() => {
                    const pageType =
                      type === "track"
                        ? "TrackPage"
                        : type === "artist"
                        ? "ArtistPage"
                        : type === "album"
                        ? "AlbumPage"
                        : null;
                    navigation.navigate(pageType, {
                      id: item.id,
                      name: item?.name,
                      imageUrl: item.imageUrl,
                    });
                  }}>
                  {type === "track" ? (
                    <View
                      style={{
                        width: 250,
                      }}>
                      <List.Item
                        style={{ width: 250, marginRight: 30, display: "flex" }}
                        title={item.name}
                        titleStyle={{ width: 200, fontWeight: "bold" }}
                        titleNumberOfLines={2}
                        description={item.artistNames}
                        descriptionNumberOfLines={1}
                        descriptionStyle={{
                          color: themeContext.colors.accentTwo,
                          width: 200,
                        }}
                        left={() =>
                          item.imageUrl ? (
                            <RoundImage
                              style={{ width: 50, height: 50 }}
                              resizeMode="contain"
                              source={{
                                uri: `${item.imageUrl}`,
                              }}
                            />
                          ) : (
                            <Avatar.Icon
                              style={{
                                borderRadius: 15,
                                backgroundColor:
                                  themeContext.colors.backgroundContrast,
                              }}
                              icon="plus-box"
                            />
                          )
                        }
                      />
                    </View>
                  ) : type === "artist" ? (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: 100,
                      }}>
                      {item.imageUrl ? (
                        <Avatar.Image
                          size={80}
                          source={{
                            uri: `${item.imageUrl}`,
                          }}
                        />
                      ) : (
                        <Avatar.Icon icon="plus-box" />
                      )}
                      <Caption
                        style={{
                          textAlign: "center",
                          color: themeContext.colors.accentTwo,
                          marginTop: 10,
                        }}>
                        {item.name}
                      </Caption>
                    </View>
                  ) : type === "album" ? (
                    <View>
                      {item.imageUrl ? (
                        <RoundImage
                          style={{
                            width: 120,
                            height: 120,
                            marginRight: 10,
                            marginBottom: 10,
                            opacity: 0.5,
                          }}
                          resizeMode="contain"
                          source={{
                            uri: `${item.imageUrl}`,
                          }}
                        />
                      ) : (
                        <Avatar.Icon
                          style={{
                            borderRadius: 15,
                            width: 120,
                            height: 120,
                            marginRight: 10,
                            marginBottom: 10,
                            backgroundColor:
                              themeContext.colors.backgroundContrast,
                          }}
                          icon="plus-box"
                        />
                      )}

                      <View
                        style={{
                          position: "absolute",
                          bottom: 0,
                          marginLeft: 10,
                          marginBottom: 3,
                          width: 100,
                        }}>
                        <BoldWhiteCaption>{item.name}</BoldWhiteCaption>
                        {/* <Caption>
                          {item.artistNames.map((i) => i).join(", ")}
                        </Caption> */}
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
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
            <FlatList
              data={array}
              keyExtractor={(item, index) => index.toString() + item}
              renderItem={({ item, index }) => (
                <View>
                  {item.name ? (
                    <Chip
                      style={{
                        backgroundColor: themeContext.colors.primary,
                        margin: 10,
                        // width: 300,
                        // height: 70,
                        padding: 10,
                        // display: "flex",
                        // flexDirection: "column",

                        // color: themeContext.colors.darkText,
                      }}
                      avatar={
                        <View
                          style={{
                            marginRight: 25,
                          }}>
                          <Avatar.Image
                            size={35}
                            source={{
                              uri: `${item.imageUrl}`,
                            }}
                          />
                        </View>
                      }
                      onClose={() => {
                        console.log("chip closed", index);
                        setArray(Object.assign([...array], { [index]: {} }));
                      }}>
                      {item.name}
                    </Chip>
                  ) : (
                    <Chip
                      style={{
                        backgroundColor: themeContext.colors.primary,

                        margin: 10,
                        // width: 300,
                        // height: 70,
                        padding: 10,
                        // color: themeContext.colors.darkText,
                      }}
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
      </View>
    </ScrollView>
  );
};
