import React, { useContext } from "react";
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
import {
  StyledColumnView,
  Row,
  IconDescription,
} from "../../../styled-components/ReusedUI";
import { useGetCommentsQuery } from "../../../generated-components/apolloComponents";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import { AddComment } from "./AddComment";
import { CommentLikeButton } from "./CommentLikeButton";
import { View, Image, ImageBackground } from "react-native";
import { ThemeContext } from "styled-components";
import { styles } from "../../../styled-components/StyleSheet";
import { UserTitle } from "../UserTitle";
import { useStoreState } from "../../../state-management/hooks";

// interface CommentsViewProps {}

export const CommentsView: React.FC<HomeStackNavProps<"CommentPage">> = ({
  route,
  navigation,
}) => {
  const themeContext = useContext(ThemeContext);
  const currentUser = useStoreState((state) => state.user.user);
  const {
    postId,
    postType,
    contentId,
    name,
    imageUrl,
    question,
  } = route.params;
  const { data, loading, error } = useGetCommentsQuery({
    variables: {
      data: {
        id: postId,
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
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../../local-assets/wavy.png")}>
      <ScrollView>
        <StyledColumnView>
          {postType === "poll" ? (
            <Card>
              <Card.Content style={{ alignItems: "center" }}>
                <Title>{question}</Title>
                <Title>{name}</Title>
              </Card.Content>
            </Card>
          ) : (
            <Card
              style={{ marginBottom: 20, marginTop: 30 }}
              theme={{ roundness: 15 }}>
              <Card.Content
                style={{
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  paddingLeft: 20,
                }}>
                {/*************  Content Image *************/}
                <Row
                  style={{ justifyContent: "space-around", paddingRight: 10 }}>
                  <View
                    style={{
                      // TODO: modify for android
                      shadowColor: themeContext.colors.primary,
                      shadowOffset: { width: 0.5, height: 5 },
                      shadowOpacity: 0.3,
                    }}>
                    <Image
                      style={{
                        width: 260,
                        height: 260,
                        left: -30,
                        top: -40,
                        borderRadius: 15,
                      }}
                      resizeMode="contain"
                      source={{
                        uri: `${imageUrl}`,
                      }}
                    />
                  </View>
                </Row>
              </Card.Content>
            </Card>
          )}
          <Card theme={{ roundness: 15 }}>
            <Card.Content
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
              }}>
              {data.getComments.length > 0 ? (
                <FlatList
                  data={data.getComments.sort((a, b) =>
                    a.timeSubmitted.localeCompare(b.timeSubmitted)
                  )}
                  keyExtractor={(results, index) =>
                    results!?.id!?.toString() + index
                  }
                  renderItem={(results) => (
                    <View style={{ marginTop: 10 }}>
                      <UserTitle
                        username={results.item.user.username}
                        timeSubmitted={results.item.timeSubmitted}
                        userId={+results.item.user.id}
                        userImage={results.item.user.profilePicture}
                        avatarSize={24}
                      />
                      <View style={{ marginLeft: 30 }}>
                        <Paragraph
                          style={{ color: themeContext.colors.darkText }}>
                          {results.item.text}
                        </Paragraph>
                        <Row
                          style={{ justifyContent: "flex-start", left: -10 }}>
                          <CommentLikeButton
                            commentId={+results.item.id}
                            postType={postType}
                            postId={postId}
                          />
                          <IconDescription>{`${results.item.likes}`}</IconDescription>
                        </Row>
                      </View>
                    </View>
                  )}
                />
              ) : (
                <Caption>No comments yet!</Caption>
              )}
            </Card.Content>
          </Card>
          <AddComment
            imageUrl={currentUser.profilePicture}
            navigation={navigation}
            route={route}
          />
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};
