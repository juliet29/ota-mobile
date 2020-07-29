import React from "react";
import { Card, Caption } from "react-native-paper";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { AlbumTopFiveWrapper } from "./types/albums/AlbumTopFiveWrapper";
import { TopFive } from "../../../generated-components/apolloComponents";

interface UserTopFiveViewProps {
  id: number;
}
export type TopFiveArrayType = {
  id?: string;
  name?: string;
  imageUrl?: string;
  artistNames?: string[];
};

export const UserTopFiveView: React.FC<UserTopFiveViewProps> = ({ id }) => {
  console.log(id);
  return (
    <StyledColumnView>
      <AlbumTopFiveWrapper id={id} />
    </StyledColumnView>
  );
};
