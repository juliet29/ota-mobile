import React from "react";
import { FlatList } from "react-native";
import { Button, Card, Searchbar } from "react-native-paper";
import { useSearchSpotifyQuery } from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
import { useNavigation } from "@react-navigation/native";

interface AddContentToPostProps {}

export const AddContentToPost: React.FC<AddContentToPostProps> = ({}) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const postType = useStoreState((state) => state.createPost.postType);
  // TODO put in use effect
  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: postType,
      query: searchQuery,
    },
  });

  console.log(data);
  console.log(data?.search?.__typename);
  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }
  // if (error || !data) {
  //   console.log(error);
  //   return <Text>Error..</Text>;
  // }
  // TODO: handle errors

  // @ts-ignore
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Wrapper style={{ backgroundColor: "white" }}>
      <StyledColumnView>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        {/* <FlatList
          data={data?.search?.__typename? }
          renderItem={(results) => (
            <Card>
              <Button>{results.item.name}</Button>
            </Card>
          )}
          keyExtractor={(result, index) => result.name + index}
        /> */}
        <Button onPress={() => navigation.goBack()}>Dismiss</Button>
      </StyledColumnView>
    </Wrapper>
  );
};
