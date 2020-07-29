import React from "react";
import {
  Caption,
  Card,
  ActivityIndicator,
  Subheading,
  Paragraph,
  IconButton,
  Colors,
  Avatar,
  Title,
  Button,
} from "react-native-paper";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { useGetCommentsQuery } from "../../../generated-components/apolloComponents";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { AddComment } from "./AddComment";

interface CommentsViewProps {}

export const CommentsView: React.FC<HomeStackNavProps<"CommentPage">> = ({
  route,
  navigation,
}) => {
  const { postId, postType, contentId, name, imageUrl } = route.params;
  const { data, loading, error } = useGetCommentsQuery({
    variables: {
      data: {
        id: +postId,
        postType: postType,
      },
    },
  });
  console.log(data);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error..</Caption>;
  }
  return (
    <ScrollView>
      <StyledColumnView>
        <Card>
          <Card.Content style={{ alignItems: "center" }}>
            <Avatar.Image size={80} source={{ uri: `${imageUrl}` }} />
            <Title>{name}</Title>
          </Card.Content>
        </Card>
        {data.getComments.length > 0 ? (
          <FlatList
            data={data.getComments}
            keyExtractor={(results, index) => results!?.id!?.toString() + index}
            renderItem={(results) => (
              <Card>
                {/* <Subheading>{results.item.user}</Subheading> */}
                <Caption>{results.item.timeSubmitted}</Caption>
                <Paragraph>{results.item.text}</Paragraph>
                <IconButton icon="heart" color={Colors.red500} />
              </Card>
            )}
          />
        ) : (
          <Caption>No comments yet!</Caption>
        )}
        <AddComment navigation={navigation} route={route} />
      </StyledColumnView>
    </ScrollView>
  );
};
