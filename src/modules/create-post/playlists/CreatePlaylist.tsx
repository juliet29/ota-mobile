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
import { FlatList } from "react-native-gesture-handler";

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
  //   useEffect(() => {
  //     console.log("update array", array);
  //   }, [array]);
  const submitPlaylist = () => {
    const playlistData = {
      title,
      description,
      array,
    };
    console.log(" playlist published", playlistData);
  };
  return (
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
                  setArray(array.filter((i) => i.name !== results.item.name));
                }}
              />
            )}
          />
        )}
      />
    </StyledColumnView>
  );
};
