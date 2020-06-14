import React from "react";
import { View, Text } from "react-native";
import { Center } from "./Center";
import { TextInput, Button } from "react-native-paper";
import styled from "styled-components/native";

interface LoginViewProps {}

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  margin-top: 300px;
  margin-bottom: 250px;
`;

// const StyledTextInput = styled(TextInput)`
//   margin-bottom: 20px;
//   border-radius: 50px;
// `;

export const LoginView: React.FC<LoginViewProps> = ({}) => {
  return (
    <Wrapper>
      <TextInput label="Email" mode="outlined" />
      <TextInput label="Password" mode="outlined" />
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        SIGN IN
      </Button>
    </Wrapper>
  );
};
