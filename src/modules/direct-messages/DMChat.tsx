import React from "react";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { StyledColumnView } from "../../styled-components/ReusedUI";
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
import { ImageBackground } from "react-native";
import { styles } from "../../styled-components/StyleSheet";

interface DMChatProps {}

export const DMChat: React.FC<DMChatProps & DMStackNavProps<"DMChat">> = ({
  navigation,
  route,
}) => {
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
      <ScrollView>
        <StyledColumnView>
          <Avatar.Image
            size={40}
            source={{
              uri: `${partnerPictureURL}`,
            }}
          />
          <Title>{partnerName}</Title>
          <FlatList
            data={data.getMyDMChat.sort((a, b) =>
              a.timeSubmitted.localeCompare(b.timeSubmitted)
            )}
            keyExtractor={(item, index) => item.sender.id.toString() + index}
            renderItem={(item) => (
              <List.Item
                title={item.item.text}
                description={item.item.timeSubmitted}
                style={
                  +item.item.sender.id === currentUser.id
                    ? { backgroundColor: blue100 }
                    : { backgroundColor: grey100 }
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
          <NewDMInput partnerID={partnerID} />
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};
