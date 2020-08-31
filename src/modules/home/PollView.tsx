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
import {
  Poll,
  useUpdatePollMutation,
  GetPostsDocument,
  PollInput,
  PollOptionInput,
} from "../../generated-components/apolloComponents";
type OptionData = { option: string; votes?: number };
interface PollViewProps {
  item: Poll;
}

export const PollView: React.FC<PollViewProps & HomeStackNavProps<"Feed">> = ({
  item,
  navigation,
  route,
}) => {
  const [showVotes, setShowVotes] = useState(false);
  const [updatePoll] = useUpdatePollMutation();

  const submitUpdatePoll = async (optionName: string) => {
    // update votes on the options
    const newOptions: PollOptionInput[] = item.options.map(
      ({ __typename, ...i }) => {
        if (i.option === optionName) {
          i.votes++;
        }
        return i;
      }
    );
    console.log("newOptions", newOptions);

    const data: PollInput = {
      id: +item.id,
      options: newOptions,
    };
    try {
      const response = await updatePoll({
        variables: { data },
        refetchQueries: [{ query: GetPostsDocument }],
      });
      console.log("response updatePollData", response);
    } catch (err) {
      return err;
    } finally {
      console.log(" success update poll");
    }
  };

  return (
    <Card>
      {/* TODO: make a global style for centering */}
      <Card.Content style={{ alignItems: "center" }}>
        <Text>{item?.timeSubmitted}</Text>
        <Caption>Poll</Caption>
        <Title>{item.question}</Title>
        <FlatList
          data={item.options}
          keyExtractor={(item, ix) => ix.toString()}
          renderItem={(option) =>
            !showVotes ? (
              <StyledColumnView>
                <Button
                  onPress={() => {
                    // TODO: update user's vote
                    submitUpdatePoll(option.item.option);
                    setShowVotes(true);
                  }}>
                  {option.item.option}
                </Button>
              </StyledColumnView>
            ) : (
              <View>
                <Subheading>
                  {option.item.votes} - {option.item.option}
                </Subheading>
              </View>
            )
          }
        />
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("CommentPage", {
              postId: +item.id,
              postType: "poll",
              contentId: item?.id,
              question: item.question,
            });
          }}>
          SEE COMMENTS
        </Button>
        <PostLikeButton postType={"poll"} postId={+item.id} />
        <Paragraph>{`Likes: ${item.likes}`}</Paragraph>
      </Card.Content>
    </Card>
  );
};
