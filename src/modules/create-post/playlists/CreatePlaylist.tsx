import React, { useState, useEffect } from "react";
import { Title, TextInput, Searchbar, Caption } from "react-native-paper";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { TrackSearchPlaylist } from "./TrackSearchPlaylist";

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
  useEffect(() => {
    console.log("update array", array);
  }, [array]);
  return (
    <StyledColumnView style={{ marginLeft: 20, marginRight: 20 }}>
      <Title>Username</Title>
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
    </StyledColumnView>
  );
};
