import React from "react";
import { Image, ImageBackground, View } from "react-native";
import {
  Caption,
  ActivityIndicator,
  Card,
  Title,
  Paragraph,
  Text,
  IconButton,
} from "react-native-paper";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { useGetTrackPostsQuery } from "../../generated-components/apolloComponents";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import {
  StyledColumnView,
  RoundImage,
  Row,
} from "../../styled-components/ReusedUI";
import { styles } from "../../styled-components/StyleSheet";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { UserTitle } from "../home/UserTitle";
import {
  UnroundCard,
  BoldWhiteCaption,
} from "../../styled-components/StylishComponents";

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

  console.log("track posts d", data);

  const themeContext = useContext(ThemeContext);

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
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
      <ScrollView>
        <StyledColumnView>
          <View style={{ alignItems: "center" }}>
            <RoundImage
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
              source={{
                uri: `${imageUrl}`,
              }}
            />
            <Title
              style={{ color: themeContext.colors.text, textAlign: "center" }}>
              {name}
            </Title>
            <Caption style={{ color: themeContext.colors.text }}>
              Average Vote: {getAvgVote()}
            </Caption>

            {artistNames ? (
              <Caption style={{ color: themeContext.colors.text }}>
                Performed by {artistNames.join(", ")}
              </Caption>
            ) : (
              <></>
            )}
          </View>
        </StyledColumnView>

        <StyledColumnView>
          <BoldWhiteCaption> SONG IMPRESSIONS </BoldWhiteCaption>
          {data.getTrackPosts.length < 1 ? (
            <Card>
              <Caption style={{ textAlign: "center" }}>
                There are no posts about this track yet!
              </Caption>
            </Card>
          ) : (
            <View>
              <FlatList
                data={data.getTrackPosts}
                renderItem={(item) => (
                  <UnroundCard style={{ marginBottom: 2 }}>
                    <Card.Content>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ flexGrow: 2 }}>
                          <UserTitle
                            username={item.item.user.username}
                            timeSubmitted={item.item.timeSubmitted}
                            userId={+item.item.user.id}
                            userImage={item.item.user.profilePicture}
                            avatarSize={24}
                          />
                        </View>
                        <IconButton
                          size={20}
                          icon={
                            item.item.vote === 1
                              ? "thumb-up-outline"
                              : "thumb-down-outline"
                          }
                        />
                      </View>
                      {/* <Caption>{item.item.user.username}</Caption>
                      <Text>{item.item.timeSubmitted}</Text> */}
                      <Paragraph style={{ marginLeft: 30 }}>
                        {item.item.text}
                      </Paragraph>
                    </Card.Content>
                  </UnroundCard>
                )}
                keyExtractor={(item, ix) =>
                  ix.toString().concat(item.timeSubmitted.toString())
                }
              />
            </View>
          )}
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};
