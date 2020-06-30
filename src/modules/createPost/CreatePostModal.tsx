import React from "react";
import { Wrapper, StyledColumnView } from "../../styled-components/ReusedUI";
import { Text } from "react-native-paper";

interface CreatePostModalProps {}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({}) => {
  return (
    <Wrapper>
      <StyledColumnView>
        <Text>Example Modal</Text>
      </StyledColumnView>
    </Wrapper>
  );
};
