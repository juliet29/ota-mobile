import React, { useState } from "react";
import { AlbumTopFiveEdit } from "./AlbumTopFiveEdit";
import { TopFiveArrayType } from "../../UserTopFiveView";
import { StyledColumnView } from "../../../../../styled-components/ReusedUI";
import { Button, Caption, Avatar, Title } from "react-native-paper";
import {
  useUpdateUserTopFiveMutation,
  TopFiveArrayInput,
  GetOtherUserDocument,
  TopFiveInput,
  TopFive,
} from "../../../../../generated-components/apolloComponents";
import { FlatList } from "react-native-gesture-handler";
import { TypeDisplay } from "../../TypeDisplay";

interface AlbumTopFiveWrapperProps {
  id: number;
}

export const AlbumTopFiveWrapper: React.FC<AlbumTopFiveWrapperProps> = ({
  id,
}) => {
  const [albumArray, setAlbumArray] = useState(Array<TopFiveArrayType>());
  const [updateTopFive, { data: mdata }] = useUpdateUserTopFiveMutation();
  console.log("mdata", mdata.updateUserTopFive.topAlbums);

  const submitUpdateTopFive = async () => {
    const dataArray: TopFiveInput[] = albumArray;
    const data: TopFiveArrayInput = {
      dataArray,
      type: "album",
    };
    try {
      const response = await updateTopFive({
        variables: { data },
        refetchQueries: [
          { query: GetOtherUserDocument, variables: { data: { id } } },
        ],
      });
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  };

  return (
    <StyledColumnView>
      <Title>Top Albums</Title>
      <TypeDisplay
        id={id}
        freshData={mdata.updateUserTopFive.topAlbums}
        type={"album"}
      />

      <AlbumTopFiveEdit array={albumArray} setArray={setAlbumArray} />
      <Button onPress={submitUpdateTopFive}>Submit</Button>
    </StyledColumnView>
  );
};
