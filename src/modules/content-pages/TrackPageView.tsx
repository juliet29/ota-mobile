import React from "react";
import { Image } from "react-native";
import {
  Caption,
  ActivityIndicator,
  Card,
  Title,
  Paragraph,
  Text,
} from "react-native-paper";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { useGetTrackPostsQuery } from "../../generated-components/apolloComponents";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { StyledColumnView } from "../../styled-components/ReusedUI";

interface TrackPageViewProps {}

export const TrackPageView: React.FC<HomeStackNavProps<"TrackPage">> = ({
  route,
  navigation,
}) => {
  const { id, name, artistNames, imageUrl } = route.params;
  const { data, loading, error } = useGetTrackPostsQuery({
    variables: {
      id: id,
    },
  });

  const getAvgVote = () => {
    const voteNum = data.getTrackPosts.map((i) => i.vote)[0];
    if (voteNum) {
      return voteNum;
    }
    return 0;
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
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
            <Caption>Performed By</Caption>
            {artistNames ? (
              artistNames.map((i) => <Caption>{i}</Caption>)
            ) : (
              <></>
            )}
            <Caption>Thubmbs Up/ Thumbs Down: {getAvgVote()}</Caption>
          </Card.Content>
        </Card>
      </StyledColumnView>

      <StyledColumnView>
        <Caption>REVIEWS</Caption>
        {data.getTrackPosts.length < 1 ? (
          <Card>
            <Caption style={{ textAlign: "center" }}>
              There are no posts about this track yet!
            </Caption>
          </Card>
        ) : (
          <StyledColumnView>
            <FlatList
              data={data.getTrackPosts}
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
