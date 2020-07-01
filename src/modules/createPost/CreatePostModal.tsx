import React, { useEffect } from "react";
import { Wrapper, StyledColumnView } from "../../styled-components/ReusedUI";
import {
  Text,
  Searchbar,
  Card,
  Title,
  Paragraph,
  Button,
} from "react-native-paper";
import { useSearchQuery } from "../../generated-components/apolloComponents";
import { FlatList } from "react-native";

interface CreatePostModalProps {}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, loading, error } = useSearchQuery({
    variables: {
      type: "artist",
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

  // TODO execute the search query
  // @ts-ignore
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Wrapper>
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
