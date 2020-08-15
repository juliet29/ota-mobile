import React, { useState } from "react";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import {
  Card,
  Caption,
  List,
  Avatar,
  Title,
  Paragraph,
  Button,
  Subheading,
} from "react-native-paper";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { Image, Text, View } from "react-native";
import { PostLikeButton } from "./PostLikeButton";
import { emptyImage } from "./FeedView";
import { FlatList } from "react-native-gesture-handler";
type OptionData = { option: string; votes?: number };
interface PollViewProps {
  item: {
    question: string;
    timeSubmitted: string;
    options: OptionData[];
    length?: number;
  };
}

export const PollView: React.FC<PollViewProps & HomeStackNavProps<"Feed">> = ({
  item,
  navigation,
  route,
}) => {
  const [showVotes, setShowVotes] = useState(false);
  return (
    <Card>
      {/* TODO: make a global style for centering */}
      <Card.Content style={{ alignItems: "center" }}>
        {/* {item.user ? (
                <StyledColumnView>
                  <Caption>{item.user.username}</Caption>
                  <List.Item
                    title={item?.user.username}
                    description={item?.user.username}
                    onPress={() => {
                      navigation.navigate("UserPage", { id: +item?.user.id });
                    }}
                    left={(props) => (
                      <Avatar.Image
                        size={20}
                        source={{
                          uri: `${
                            item?.user.profilePicture
                              ? item?.user.profilePicture
                              : emptyImage
                          }`,
                        }}
                      />
                    )}
                  />
                </StyledColumnView>
              ) : (
                <></> 
              )} */}

        <Text>{item?.timeSubmitted}</Text>
        <Caption>Poll</Caption>
        <Subheading>{item.question}</Subheading>
        <FlatList
          data={item.options}
          keyExtractor={(item, ix) => ix.toString()}
          renderItem={(option) =>
            !showVotes ? (
              <StyledColumnView>
                <Button
                  onPress={() => {
                    // TODO: update user's vote
                    setShowVotes(true);
                  }}>
                  {option.item.option}
                </Button>
              </StyledColumnView>
            ) : (
              <View>
                <Subheading>
                  {option.item.option} {option.item.votes}
                </Subheading>
              </View>
            )
          }
        />

        {/* 
              <Button
                mode="contained"
                onPress={() => {
                  navigation.navigate("CommentPage", {
                    postId: +item.id,
                    postType: "artist", // TODO: change to poll -> will have dif look
                    contentId: item?.artistId,
                    name: item?.artistName,
                    imageUrl: item.imageUrl,
                  });
                }}>
                SEE COMMENTS
              </Button> */}
        {/* <PostLikeButton postType={"artist"} postId={+item.id} />
              <Paragraph>{`Likes: ${item.likes}`}</Paragraph> */}
      </Card.Content>
    </Card>
  );
};
