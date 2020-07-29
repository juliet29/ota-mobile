import React, { useState } from "react";
import { Button, List, Title } from "react-native-paper";
import {
  GetOtherUserDocument,
  TopFiveArrayInput,
  TopFiveInput,
  useUpdateUserTopFiveMutation,
} from "../../../../../generated-components/apolloComponents";
import { StyledColumnView } from "../../../../../styled-components/ReusedUI";
import { TypeDisplay } from "../../TypeDisplay";
import { TopFiveArrayType, TopFiveWrapperProps } from "../../UserTopFiveView";
import { ArtistTopFiveEdit } from "./ArtistTopFiveEdit";

export const ArtistTopFiveWrapper: React.FC<TopFiveWrapperProps> = ({ id }) => {
  const [artistArray, setArtistArray] = useState(Array<TopFiveArrayType>());
  const [searchQuery, setSearchQuery] = useState("");
  //   const [showSettings, setShowSettings] = useState(false);
  const [updateTopFive, { data: mdata }] = useUpdateUserTopFiveMutation();
  console.log("mdata1Artist", mdata);
  console.log("mdataArtist", mdata ? mdata.updateUserTopFive.topArtists : null);

  const submitUpdateTopFive = async () => {
    const dataArray: TopFiveInput[] = artistArray;
    const data: TopFiveArrayInput = {
      dataArray,
      type: "artist",
    };
    try {
      // make the mutation
      await updateTopFive({
        variables: { data },
        refetchQueries: [
          { query: GetOtherUserDocument, variables: { data: { id } } },
        ],
      });
      // clean up
      setSearchQuery("");
      setArtistArray([]);
    } catch (err) {
      console.log("error in album top five wrapper", err);
    }
    // setShowSettings(false);
  };

  return (
    <StyledColumnView>
      <Title>Top Artists</Title>

      <TypeDisplay
        id={id}
        freshData={mdata ? mdata.updateUserTopFive.topArtists : null}
        type={"artist"}
      />
      <List.Accordion title="Edit Top Five">
        <ArtistTopFiveEdit
          array={artistArray}
          setArray={setArtistArray}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Button onPress={submitUpdateTopFive}>Submit</Button>
      </List.Accordion>
    </StyledColumnView>
  );
};
