import React from "react";
import {
  Caption,
  ActivityIndicator,
  Card,
  Button,
  Paragraph,
  Title,
  Text,
  Subheading,
} from "react-native-paper";
import {
  useGetAlbumPostsQuery,
  useGetAlbumTracksQuery,
} from "../../generated-components/apolloComponents";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { Image } from "react-native";

interface AlbumPageProps {}

export const AlbumPage: React.FC<HomeStackNavProps<"AlbumPage">> = ({
  route,
  navigation,
}) => {
  const { id, name, imageUrl } = route.params;
  const { data, loading, error } = useGetAlbumPostsQuery({
    variables: {
      id: id,
    },
  });

  const {
    data: sdata,
    loading: sloading,
    error: serror,
  } = useGetAlbumTracksQuery({
    variables: {
      id: id,
    },
  });

  if (loading || sloading) {
    return <ActivityIndicator />;
  }
  if (error || !data || serror || !sdata) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  return (
    <ScrollView>
      <StyledColumnView>
        <Card>
          <Card.Content style={{ alignItems: "center" }}>
            <Image
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
              source={{
                uri: `${imageUrl}`,
              }}
            />
            <Title>{name}</Title>
          </Card.Content>
        </Card>
      </StyledColumnView>

      <StyledColumnView>
        <Caption>SONGS</Caption>
        <FlatList
          data={sdata.getAlbumTracks.items}
          renderItem={(item) => (
            <Card>
              <Card.Content style={{ alignItems: "center" }}>
                <Subheading>{item.item.name}</Subheading>
                {item.item.artists.map((element, ix) => (
                  <Caption key={ix}>{element.name}</Caption>
                ))}
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item, ix) => ix.toString()}
        />
      </StyledColumnView>

      <StyledColumnView>
        <Caption>REVIEWS</Caption>
        {data.getAlbumPosts.length < 1 ? (
          <Card>
            <Caption style={{ textAlign: "center" }}>
              There are no posts about this album yet!
            </Caption>
          </Card>
        ) : (
          <StyledColumnView>
            <FlatList
              data={data.getAlbumPosts}
              renderItem={(item) => (
                <Card>
                  <Card.Content style={{ alignItems: "center" }}>
                    <Caption>{item.item.user.username}</Caption>
                    <Text>{item.item.timeSubmitted}</Text>
                    <Paragraph>{item.item.text}</Paragraph>
                  </Card.Content>
                </Card>
              )}
              keyExtractor={(item, ix) => ix.toString()}
            />
          </StyledColumnView>
        )}
      </StyledColumnView>
    </ScrollView>
  );
};
