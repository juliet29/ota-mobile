import React from "react";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { useGetArtistAlbumsQuery } from "../../../generated-components/apolloComponents";
import { Image } from "react-native";
import {
  Card,
  Caption,
  Text,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

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
      renderItem={(item) => (
        <Card>
          <Card.Content style={{ alignItems: "center" }}>
            {
              item?.item.images.map((element) => (
                <Image
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                  source={{
                    uri: `${element.url}`,
                  }}
                />
              ))[0]
            }

            <Text>{item.item.name}</Text>
            <Caption>Rating</Caption>
            <Button
              onPress={() => {
                navigation.navigate("AlbumPage", {
                  id: item?.item.id,
                  name: item?.item.name,
                  imageUrl: item?.item.images.map((element) => element.url)[0],
                });
              }}>
              See the Album
            </Button>
          </Card.Content>
        </Card>
      )}
      keyExtractor={(item, ix) => ix.toString()}
    />
  );
};
