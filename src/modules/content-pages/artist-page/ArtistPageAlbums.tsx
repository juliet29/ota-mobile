import React from "react";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { useGetArtistAlbumsQuery } from "../../../generated-components/apolloComponents";
import { Image, View } from "react-native";
import {
  Card,
  Caption,
  Text,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { RoundImage } from "../../../styled-components/ReusedUI";
import { BoldWhiteCaption } from "../../../styled-components/StylishComponents";

interface ArtistProps {
  id: string;
}

export const ArtistPageAlbums: React.FC<
  ArtistProps & HomeStackNavProps<"ArtistPage">
> = ({ id, navigation, route }) => {
  const { data, loading, error } = useGetArtistAlbumsQuery({
    variables: {
      id: id,
    },
  });
  console.log(data);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  if (data.getArtistAlbums.items.length < 1) {
    return (
      <Card>
        <Caption style={{ textAlign: "center" }}>
          This Artist has no albums
        </Caption>
      </Card>
    );
  }

  return (
    <FlatList
      data={data.getArtistAlbums.items}
      numColumns={2}
      renderItem={(item) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AlbumPage", {
              id: item?.item.id,
              name: item?.item.name,
              imageUrl: item?.item.images.map((element) => element.url)[0],
            });
          }}>
          <View style={{ padding: 3 }}>
            <RoundImage
              style={{ width: 120, height: 120, opacity: 0.7 }}
              resizeMode="contain"
              source={{
                uri: `${item.item.images.map((i) => i.url)[0]}`,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                marginLeft: 10,
                marginBottom: 3,
              }}>
              <BoldWhiteCaption>{item.item.name}</BoldWhiteCaption>
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, ix) => ix.toString()}
    />
  );
};
