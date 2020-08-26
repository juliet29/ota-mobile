import React from "react";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import {
  Caption,
  ActivityIndicator,
  Title,
  Card,
  Subheading,
  Paragraph,
  List,
  Avatar,
} from "react-native-paper";
import { useGetMyDMsQuery } from "../../generated-components/apolloComponents";
import { CommentLikeButton } from "../home/comments/CommentLikeButton";
import { DMStackNavProps } from "../../navigation/app/direct-messages/DMParamList";

interface DMFeedProps {}

export const DMFeed: React.FC<DMFeedProps & DMStackNavProps<"DMFeed">> = ({
  navigation,
  route,
}) => {
  const { data, loading, error } = useGetMyDMsQuery();
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
        <Title>My Messages</Title>
        <FlatList
          data={data.getMyDMs.sort((a, b) =>
            a.timeSubmitted.localeCompare(b.timeSubmitted)
          )}
          keyExtractor={(item, index) => item.sender.id.toString() + index}
          renderItem={(item) => (
            <List.Item
              title={item.item.sender.username}
              description={item.item.text}
              onPress={() =>
                navigation.navigate("DMChat", {
                  partnerID: +item.item.sender.id,
                })
              }
              left={() => (
                <Avatar.Image
                  size={80}
                  source={{
                    uri: `${item.item.sender.profilePicture}`,
                  }}
                />
              )}
            />
          )}
        />
      </StyledColumnView>
    </ScrollView>
  );
};
