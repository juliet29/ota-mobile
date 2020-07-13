import React from "react";
import {
  Text,
  ActivityIndicator,
  Card,
  Caption,
  Button,
  Title,
  Subheading,
  Paragraph,
} from "react-native-paper";
import {
  useGetArtistAlbumsQuery,
  useGetArtistPostsQuery,
} from "../../generated-components/apolloComponents";
import { FlatList } from "react-native-gesture-handler";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../styled-components/ReusedUI";

interface ArtistPostsViewProps {}

export const ArtistPostsView: React.FC<HomeStackNavProps<"ArtistPosts">> = ({
  route,
  navigation,
}) => {
  const { id, name } = route.params;
  const { data, loading, error } = useGetArtistPostsQuery({
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

  if (data.getArtistPosts.length < 1) {
    return (
      <Card>
        <Caption style={{ textAlign: "center" }}>
          There are no posts about this artist yet!
        </Caption>
      </Card>
    );
  }

  return (
    <StyledColumnView>
      <Title>Shares of {name}</Title>
      {data.getArtistPosts.length < 1 ? (
        <Card>
          <Caption style={{ textAlign: "center" }}>
            There are no posts about this artist yet!
          </Caption>
        </Card>
      ) : (
        <FlatList
          data={data.getArtistPosts}
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
      )}
    </StyledColumnView>
  );
};
