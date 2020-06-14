import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Center } from "./Center";
import { TextInput, Button } from "react-native-paper";
import styled from "styled-components/native";
import { AuthNavProps } from "./AuthParamList";
import { AuthContext } from "./AuthProvider";

interface LoginViewProps {}

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  margin-top: 250px;
  margin-bottom: 250px;
`;

// const StyledTextInput = styled(TextInput)`
//   margin-bottom: 20px;
//   border-radius: 50px;
// `;

export const LoginView: React.FC<AuthNavProps<"Login">> = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  return (
    <Wrapper>
      <TextInput label="Email" mode="outlined" />
      <TextInput label="Password" mode="outlined" />
      <Button
        mode="contained"
        onPress={() => {
          login();
        }}>
        SIGN IN
      </Button>

      <Button
        mode="outlined"
        onPress={() => {
          console.log("Facebook button press");
        }}>
        Continue with Facebook
      </Button>

      <Button
        mode="text"
        onPress={() => {
          navigation.navigate("Register");
        }}>
        Don't have an account? Start now!
      </Button>
    </Wrapper>
  );
};
