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
import { StyledColumnView, ThinLine } from "../../styled-components/ReusedUI";
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
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { UserTitle } from "./UserTitle";
import { CommentsAndLikes } from "./CommentsAndLikes";
import { timeSince } from "../../utils/timeSince";
type OptionData = { option: string; votes?: number };
interface PollViewProps {
  item: Poll;
}

export const PollView: React.FC<PollViewProps & HomeStackNavProps<"Feed">> = ({
  item,
  navigation,
  route,
}) => {
  const themeContext = useContext(ThemeContext);
  const [showVotes, setShowVotes] = useState(false);
  const [updatePoll] = useUpdatePollMutation();

  const totalVotes = item.options
    .map((i) => i.votes)
    .reduce((a, b) => a + b, 0);

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
      <Card.Content style={{ paddingLeft: 20 }}>
        <View
          style={{
            width: 300,
          }}>
          <UserTitle
            username={item.user.username}
            timeSubmitted={timeSince(item.timeSubmitted)}
            userId={+item.user.id}
            userImage={item.user.profilePicture}
            avatarSize={24}
          />
        </View>
        <ThinLine />

        <Title>{item.question}</Title>
        <FlatList
          style={{
            marginTop: 20,
          }}
          data={item.options}
          keyExtractor={(item, ix) => ix.toString()}
          renderItem={(option) =>
            !showVotes ? (
              <StyledColumnView
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}>
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
              <View
                style={{
                  height: 100,
                  width: 200,
                  display: "flex",
                  flexDirection: "column",
                }}>
                <View
                  style={{
                    borderRadius: 30,
                    borderColor: themeContext.colors.text,
                    borderWidth: 2,
                    height: 30,
                    width: 200,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <View
                    style={{
                      borderRadius: 30,
                      borderColor: themeContext.colors.text,
                      height: "100%",
                      width: `${(option.item.votes / totalVotes) * 100}%`,
                      backgroundColor: themeContext.colors.primary,
                      position: "absolute",
                    }}></View>
                  <Subheading
                    style={{
                      marginLeft: 10,
                    }}>
                    {option.item.option.toUpperCase()}
                  </Subheading>
                  <Subheading
                    style={{
                      marginRight: 10,
                    }}>
                    {option.item.votes}
                  </Subheading>
                </View>
              </View>
            )
          }
        />
        <CommentsAndLikes navigation={navigation} item={item} route={route} />
        {/* <Button
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
        <Paragraph>{`Likes: ${item.likes}`}</Paragraph> */}
      </Card.Content>
    </Card>
  );
};
