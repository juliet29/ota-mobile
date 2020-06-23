import React from "react";
import { Center } from "../styled-components/Center";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { HomeStackNavProps } from "../navigation/app/home/HomeParamList";
import faker from "faker";
import { useGetPostsQuery } from "../generated-components/apolloComponents";
import { Text, View } from "react-native";

export const FeedView: React.FC<HomeStackNavProps<"Feed">> = ({
  navigation,
}) => {
  const { data, loading, error } = useGetPostsQuery();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    console.log(error);
    return <div>Error..</div>;
  }

  return (
    <FlatList
      data={data.getPosts}
      renderItem={({ item }) => (
        <Text>
          <Text> {item.id} </Text>
          <Text> {item.text} </Text>
        </Text>
      )}
      keyExtractor={(item) => item.id}
    />
  );

  // <Text>{data.getPosts.map((k) => k.text)}</Text>;
};
