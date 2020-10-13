import React from "react";
import {
  Caption,
  ActivityIndicator,
  Card,
  Button,
  Paragraph,
  Title,
  Text,
  Subheading,
  IconButton,
} from "react-native-paper";
import {
  useGetAlbumPostsQuery,
  useGetAlbumTracksQuery,
} from "../../generated-components/apolloComponents";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { StyledColumnView, RoundImage } from "../../styled-components/ReusedUI";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { Image, ImageBackground, View } from "react-native";
import { styles } from "../../styled-components/StyleSheet";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { UserTitle } from "../home/UserTitle";
import StarRating from "react-native-star-rating";
import {
  UnroundCard,
  BoldWhiteCaption,
} from "../../styled-components/StylishComponents";
import { timeSince } from "../../utils/timeSince";

interface AlbumPageProps {}

export const AlbumPageView: React.FC<HomeStackNavProps<"AlbumPage">> = ({
  route,
  navigation,
}) => {
  const themeContext = useContext(ThemeContext);
  const { id, name, imageUrl } = route.params;
  const { data, loading, error } = useGetAlbumPostsQuery({
    variables: {
      id: id,
    },
  });

  const {
    data: sdata,
    loading: sloading,
    error: serror,
  } = useGetAlbumTracksQuery({
    variables: {
      id: id,
    },
  });

  if (loading || sloading) {
    return <ActivityIndicator />;
  }
  if (error || !data || serror || !sdata) {
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
            {/* <Title>{name}</Title> */}
          </View>
        </StyledColumnView>

        <StyledColumnView>
          <BoldWhiteCaption>SONGS </BoldWhiteCaption>
          <View style={{ paddingLeft: 10 }}>
            <FlatList
              data={sdata.getAlbumTracks.items}
              renderItem={(item) => (
                <View style={{ marginVertical: 5 }}>
                  <Subheading>{item.item.name}</Subheading>
                  <Caption style={{ color: themeContext.colors.accentTwo }}>
                    {item.item.artists.map((i) => i.name).join(", ")}
                  </Caption>
                  {/* {item.item.artists.map((element, ix) => (
                    <Caption key={ix}>{element.name}</Caption>
                  ))} */}
                </View>
              )}
              keyExtractor={(item, ix) => ix.toString()}
            />
          </View>
        </StyledColumnView>

        <StyledColumnView>
          <BoldWhiteCaption> REVIEWS </BoldWhiteCaption>
          {data.getAlbumPosts.length < 1 ? (
            <Card>
              <Caption style={{ textAlign: "center" }}>
                There are no posts about this album yet!
              </Caption>
            </Card>
          ) : (
            <View>
              <FlatList
                data={data.getAlbumPosts}
                renderItem={(item) => (
                  <UnroundCard style={{ marginBottom: 2 }}>
                    <Card.Content>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ flexGrow: 2 }}>
                          <UserTitle
                            username={item.item.user.username}
                            timeSubmitted={timeSince(item.item.timeSubmitted)}
                            userId={+item.item.user.id}
                            userImage={item.item.user.profilePicture}
                            avatarSize={24}
                          />
                        </View>
                        <StarRating
                          disabled={true}
                          maxStars={5}
                          fullStar={"star"}
                          halfStar={"star-half"}
                          starSize={15}
                          fullStarColor={themeContext.colors.accent}
                          emptyStarColor={themeContext.colors.accent}
                          // iconSet={"react-native-vector-icons"}
                          rating={item.item.rating}
                          selectedStar={() => {}}
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
                keyExtractor={(item, ix) => ix.toString()}
              />
            </View>
          )}
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};
