import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Center } from "../global-ui/Center";
import { TextInput, Button } from "react-native-paper";
import styled from "styled-components/native";
import { AuthNavProps } from "../navigation/AuthParamList";
import { AuthContext } from "../AuthProvider";
import { Wrapper, StyledColumnView, LineBreak } from "../global-ui/ReusedUI";

interface LoginViewProps {}

export const LoginView: React.FC<AuthNavProps<"Login">> = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  return (
    <Wrapper>
      <StyledColumnView>
        <TextInput label="Email" mode="outlined" />
        <TextInput label="Password" mode="outlined" />
        <LineBreak />
        <Button
          mode="contained"
          onPress={() => {
            login();
          }}>
          SIGN IN
        </Button>
      </StyledColumnView>

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
