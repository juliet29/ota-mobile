import React from "react";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { Row, StyledColumnView } from "../../styled-components/ReusedUI";
import {
  Title,
  ActivityIndicator,
  Caption,
  List,
  Avatar,
} from "react-native-paper";
import {
  useGetMyDMsQuery,
  useGetMyDmChatQuery,
} from "../../generated-components/apolloComponents";
import { DMStackNavProps } from "../../navigation/app/direct-messages/DMParamList";
import { useStoreState } from "../../state-management/hooks";
import { blue100, grey100 } from "react-native-paper/src/styles/colors";
import { NewDMInput } from "./NewDMInput";
import {
  Dimensions,
  ImageBackground,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { styles } from "../../styled-components/StyleSheet";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import {
  KeyboardAwareScrollView,
  KeyboardAwareFlatList,
} from "react-native-keyboard-aware-scroll-view";

interface DMChatProps {}

export const DMChat: React.FC<DMChatProps & DMStackNavProps<"DMChat">> = ({
  navigation,
  route,
}) => {
  const themeContext = useContext(ThemeContext);

  let screenHeight = Dimensions.get("window").height;

  const { partnerID, partnerPictureURL, partnerName } = route.params;
  const currentUser = useStoreState((state) => state.user.user);

  const { data, loading, error } = useGetMyDmChatQuery({
    variables: {
      data: {
        partnerID,
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
      source={require("../../local-assets/wavy.png")}>
      <View>
        <View
          style={{
            margin: 20,
            marginTop: 70,
            height: screenHeight * 0.7,
            // height: 1000,
          }}>
          <Row
            style={{
              marginBottom: 20,
              alignItems: "center",
            }}>
            <Avatar.Image
              style={{
                marginRight: 15,
              }}
              size={40}
              source={{
                uri: `${partnerPictureURL}`,
              }}
            />
            <Title>{partnerName}</Title>
          </Row>
          <KeyboardAwareScrollView>
            <FlatList
              data={data.getMyDMChat.sort((a, b) =>
                a.timeSubmitted.localeCompare(b.timeSubmitted)
              )}
              contentContainerStyle={{
                display: "flex",
                flexDirection: "column",
              }}
              keyExtractor={(item, index) => item.sender.id.toString() + index}
              renderItem={(item) => (
                <List.Item
                  title={item.item.text}
                  description={item.item.timeSubmitted}
                  style={
                    +item.item.sender.id !== currentUser.id
                      ? {
                          backgroundColor: themeContext.colors.accent,
                          borderRadius: 10,
                          width: 230,
                          alignSelf: "flex-start",
                          marginVertical: 10,
                        }
                      : {
                          backgroundColor: themeContext.colors.primary,
                          borderRadius: 10,
                          width: 230,
                          alignSelf: "flex-end",
                          marginVertical: 10,
                        }
                  }
                  left={() =>
                    +item.item.sender.id !== currentUser.id ? (
                      <Avatar.Image
                        size={20}
                        source={{
                          uri: `${item.item.sender.profilePicture}`,
                        }}
                      />
                    ) : (
                      <></>
                    )
                  }
                />
              )}
            />

            <View
              style={
                {
                  // position: "absolute",
                  // bottom: 0,
                }
              }>
              <NewDMInput partnerID={partnerID} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};
