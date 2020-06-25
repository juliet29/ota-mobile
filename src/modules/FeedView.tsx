import React from "react";
import { Center } from "../styled-components/Center";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Button, Card, Title, Paragraph, Subheading } from "react-native-paper";
import { HomeStackNavProps } from "../navigation/app/home/HomeParamList";
import faker from "faker";
import { useGetPostsQuery } from "../generated-components/apolloComponents";
import { Text, View } from "react-native";
import { StyledColumnView } from "../styled-components/ReusedUI";

// interface ItemProps {
//   id: string,
//   text: string
// }
// function Item({ id, text, selected, onSelect}: any) {
//   return (
//     <TouchableOpacity
//       onPress={() => onSelect(id)}
//       style={[
//         styles.item,
//         { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
//       ]}
//     >
//       <Text style={styles.title}>{title}</Text>
//     </TouchableOpacity>
//   );
// }

export const FeedView: React.FC<HomeStackNavProps<"Feed">> = ({
  navigation,
}) => {
  const { data, loading, error } = useGetPostsQuery();

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  return (
    <FlatList
      data={data.getPosts}
      renderItem={({ item }) => (
        <StyledColumnView>
          <Card>
            <Card.Content>
              <Title>{item.user.username}</Title>
              <Subheading>{item.timeSubmitted}</Subheading>
              <Paragraph>{item.text}</Paragraph>
              <Paragraph>{item.link}</Paragraph>
            </Card.Content>
          </Card>
        </StyledColumnView>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
