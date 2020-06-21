import React from "react";
import { Center } from "../styled-components/Center";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native";
import { HomeStackNavProps } from "../navigation/app/home/HomeParamList";
import faker from "faker";

export const FeedView: React.FC<HomeStackNavProps<"Feed">> = ({
  navigation,
}) => {
  return (
    <Center>
      <FlatList
        style={{ width: "100%" }}
        renderItem={({ item }) => {
          return (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate("Post", {
                  name: item,
                });
              }}
            />
          );
        }}
        //   TODO: figue out the issue with the key exractor
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
};
