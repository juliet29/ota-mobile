import React from "react";
import {
  Caption,
  List,
  Avatar,
  ActivityIndicator,
  Title,
} from "react-native-paper";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { emptyImage } from "./UserView";
import { FlatList } from "react-native-gesture-handler";
import { useGetFollowingorFollowersQuery } from "../../generated-components/apolloComponents";
import { ImageBackground } from "react-native";
import { styles } from "../../styled-components/StyleSheet";

// interface FollowersProps {
//   request: "following" | "followers";
// }

export const Followers: React.FC<HomeStackNavProps<"FollowersPage">> = ({
  navigation,
  route,
}) => {
  const { id, request } = route.params;
  const { data, loading, error } = useGetFollowingorFollowersQuery({
    variables: {
      id,
      request: request,
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    // console.log(error);
    return <></>;
  }
  console.log("data", data.getFollowingorFollowers);
  console.log(`request is  ${request} and its type is ${typeof request}`);

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
      <StyledColumnView>
        <Title>{request!?.toUpperCase()}</Title>
        <FlatList
          data={data.getFollowingorFollowers}
          keyExtractor={(item, index) => item!?.toString() + index}
          renderItem={(item) => (
            <List.Item
              onPress={() => {
                navigation.navigate("UserPage", { id: +item.item.id });
              }}
              title={item.item.username}
              left={(props) => (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: `${
                      item.item.profilePicture
                        ? item.item.profilePicture
                        : emptyImage
                    }`,
                  }}
                />
              )}
            />
          )}
        />
      </StyledColumnView>
    </ImageBackground>
  );
};
