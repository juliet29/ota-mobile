import React, { useState, useEffect } from "react";
import {
  Title,
  TextInput,
  Searchbar,
  Caption,
  Avatar,
  List,
  Subheading,
  IconButton,
  Button,
} from "react-native-paper";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { TrackSearchPlaylist } from "./TrackSearchPlaylist";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  useCreatePlaylistMutation,
  PlaylistTrackInput,
  PlaylistInput,
  GetPostsDocument,
} from "../../../generated-components/apolloComponents";
import { ImageBackground } from "react-native";
import { styles } from "../../../styled-components/StyleSheet";

interface CreatePlaylistProps {}
export type PlaylistItemType = {
  name?: string;
  id?: string;
  artists?: string[];
  externalUrl?: string;
  imageUrl?: string;
};

export const CreatePlaylist: React.FC<CreatePlaylistProps> = ({}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [array, setArray] = useState(Array<PlaylistItemType>().fill({}));
  const [createPlaylist] = useCreatePlaylistMutation();
  //   useEffect(() => {
  //     console.log("update array", array);
  //   }, [array]);

  const submitPlaylist = async () => {
    const tracks: PlaylistTrackInput[] = array.map((i) => {
      const trackImageUrl = i.imageUrl;
      delete i.imageUrl;
      return { ...i, trackImageUrl };
    });
    const playlistData: PlaylistInput = {
      title,
      description,
      tracks,
    };
    console.log(" playlist to submit", playlistData);
    try {
      const response = await createPlaylist({
        variables: { data: playlistData },
        refetchQueries: [{ query: GetPostsDocument }],
      });

      console.log("response success  playlistlData", response);
    } catch (err) {
      return err;
    } finally {
      //TODO:  need to check for an error... or lool at the behave of this

      setTitle("");
      setDescription("");
      setArray(Array<PlaylistItemType>().fill({}));
      setSearchQuery("");

      // redirect to home page
      // let know post was succesfule
    }
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../../local-assets/wavy.png")}>
      <ScrollView>
        <StyledColumnView style={{ marginLeft: 20, marginRight: 20 }}>
          <Title>Username</Title>
          <Button onPress={() => submitPlaylist()}>Publish</Button>
          <TextInput
            label="Playlist Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            label="Playlist Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Searchbar
            placeholder="Search"
            onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
            value={searchQuery}
          />
          {searchQuery ? (
            <TrackSearchPlaylist
              searchQuery={searchQuery}
              array={array}
              setArray={setArray}
            />
          ) : (
            <></>
          )}
          <Title>Seclected Songs: </Title>
          <FlatList
            data={array}
            keyExtractor={(item, index) => item!?.id!?.toString() + index}
            renderItem={(results) => (
              <List.Item
                title={results.item?.name}
                description={results.item?.artists?.map((item, ix) => {
                  return item;
                })}
                left={(props) => (
                  <Avatar.Image
                    size={20}
                    source={{
                      uri: `${results.item?.imageUrl}`,
                    }}
                  />
                )}
                right={() => (
                  <IconButton
                    icon="cancel"
                    onPress={() => {
                      setArray(
                        array.filter((i) => i.name !== results.item.name)
                      );
                    }}
                  />
                )}
              />
            )}
          />
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};
