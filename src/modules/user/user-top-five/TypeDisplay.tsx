import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { Avatar, ActivityIndicator } from "react-native-paper";
import {
  useGetOtherUserQuery,
  TopFive,
} from "../../../generated-components/apolloComponents";

interface TypeDisplayProps {
  id: number;
  freshData: TopFive[];
  type: string;
}

export const TypeDisplay: React.FC<TypeDisplayProps> = ({
  id,
  freshData,
  type,
}) => {
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

  // console.log("type display data", data);
  // console.log("mdata", freshData);

  let localData =
    type === "track"
      ? data.getOtherUser.topTracks
      : type === "artist"
      ? data.getOtherUser.topArtists
      : type === "album"
      ? data.getOtherUser.topAlbums
      : null;

  return (
    <FlatList
      contentContainerStyle={{
        justifyContent: "space-around",
        flexDirection: "row",
      }}
      data={freshData ? freshData : localData}
      keyExtractor={(item, index) => item!?.id!?.toString() + index}
      renderItem={(item) => (
        <StyledColumnView>
          {/* <Caption>{item.item.name}</Caption> */}
          <Avatar.Image
            size={50}
            source={{
              uri: `${item.item.imageUrl}`,
            }}
          />
        </StyledColumnView>
      )}
    />
  );
};
