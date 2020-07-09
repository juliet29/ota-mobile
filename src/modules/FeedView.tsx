import React from "react";
import { Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Card,
  Paragraph,
  Subheading,
  Title,
  Caption,
} from "react-native-paper";
import { useGetPostsQuery } from "../generated-components/apolloComponents";
import { HomeStackNavProps } from "../navigation/app/home/HomeParamList";
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
            <Card.Content style={{ alignItems: "center" }}>
              <Title>{item?.user?.username}</Title>
              <Caption>{item?.timeSubmitted}</Caption>
              {item?.__typename === "ArtistPost" ? (
                <Subheading>{item?.artistName}</Subheading>
              ) : item?.__typename === "AlbumPost" ? (
                <Subheading>{item?.albumName}</Subheading>
              ) : (
                <Subheading>{item?.trackName}</Subheading>
              )}

              <Paragraph>{item?.text}</Paragraph>
              {item.imageUrl ? (
                <Image
                  style={{ resizeMode: "contain", width: 200, height: 200 }}
                  source={{
                    uri: `${item.imageUrl}`,
                  }}
                />
              ) : (
                <Image
                  style={{ resizeMode: "contain", width: 200, height: 200 }}
                  source={{
                    uri:
                      "https://dubsism.files.wordpress.com/2017/12/image-not-found.png?w=1094",
                  }}
                />
              )}
            </Card.Content>
          </Card>
        </StyledColumnView>
      )}
      keyExtractor={(item, ix) => ix.toString()}
    />
  );
};
