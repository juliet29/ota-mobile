import React from "react";
import { FlatList } from "react-native";
import { Button, Card, Searchbar } from "react-native-paper";
import { useSearchQuery } from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";

interface AddContentToPostProps {}

export const AddContentToPost: React.FC<AddContentToPostProps> = ({}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const postType = useStoreState((state) => state.createPost.postType);
  const { data, loading, error } = useSearchQuery({
    variables: {
      type: postType,
      query: searchQuery,
    },
  });
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
        <FlatList
          data={data?.search?.artists.items}
          renderItem={(results) => (
            <Card>
              <Button>{results.item.name}</Button>
            </Card>
          )}
          keyExtractor={(result, index) => result.name + index}
        />
      </StyledColumnView>
    </Wrapper>
  );
};
