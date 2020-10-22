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
import {
  useGetMyDMsQuery,
  useGetMyDmChatQuery,
} from "../../generated-components/apolloComponents";
import { CommentLikeButton } from "../home/comments/CommentLikeButton";
import { DMStackNavProps } from "../../navigation/app/direct-messages/DMParamList";
import { StartDM } from "./StartDM";
import { useStoreState } from "../../state-management/hooks";
import { ImageBackground } from "react-native";
import { styles } from "../../styled-components/StyleSheet";

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

interface DMFeedProps {}

export const DMFeed: React.FC<DMFeedProps & DMStackNavProps<"DMFeed">> = ({
  navigation,
  route,
}) => {
  const currentUser = useStoreState((state) => state.user.user);
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
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
      <ScrollView>
        <StyledColumnView
          style={{
            marginTop: 50,
          }}>
          <Title>My Messages</Title>
          <StartDM navigation={navigation} route={route} />
          <FlatList
            data={data.getMyDMs.sort((a, b) =>
              a.timeSubmitted.localeCompare(b.timeSubmitted)
            )}
            keyExtractor={(item, index) => item.sender.id.toString() + index}
            renderItem={(item) =>
              currentUser.id !== +item.item.sender.id ? (
                <List.Item
                  title={item.item.sender.username}
                  description={item.item.text}
                  onPress={() =>
                    navigation.navigate("DMChat", {
                      partnerID: +item.item.sender.id,
                      partnerName: item.item.sender.username,
                      partnerPictureURL: item.item.sender.profilePicture,
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
              ) : (
                <List.Item
                  title={item.item.recipient.username}
                  description={item.item.text}
                  onPress={() =>
                    navigation.navigate("DMChat", {
                      partnerID: +item.item.recipient.id,
                      partnerName: item.item.recipient.username,
                      partnerPictureURL: item.item.recipient.profilePicture,
                    })
                  }
                  left={() => (
                    <Avatar.Image
                      size={80}
                      source={{
                        uri: `${item.item.recipient.profilePicture}`,
                      }}
                    />
                  )}
                />
              )
            }
          />
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};
