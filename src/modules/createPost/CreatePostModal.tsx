import React from "react";
import { Wrapper, StyledColumnView } from "../../styled-components/ReusedUI";
import {
  Text,
  Searchbar,
  Card,
  Title,
  Paragraph,
  Button,
} from "react-native-paper";

interface CreatePostModalProps {}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
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
        <Card>
          <Card.Content>
            <Title>This is a search result</Title>
          </Card.Content>
          <Card.Actions>
            <Button>Add to Post</Button>
            {/* TODO correlate the chosen result with post creation  */}
            {/* TODO dismiss on click */}
          </Card.Actions>
        </Card>
        <Card>
          <Card.Content>
            <Title>This is a search result</Title>
          </Card.Content>
          <Card.Actions>
            <Button>Add to Post</Button>
          </Card.Actions>
        </Card>
      </StyledColumnView>
    </Wrapper>
  );
};
