import React from "react";
import { Card, Title, Button } from "react-native-paper";
import { Wrapper } from "../styled-components/ReusedUI";
import { AuthNavProps } from "../navigation/auth/AuthParamList";

interface LoginFailedProps {}

export const LoginFailed: React.FC<AuthNavProps<"LoginFailed">> = ({
  navigation,
}) => {
  return (
    <Wrapper>
      <Title>User Not Found or Register Unsuccesful :( </Title>

      <Button
        mode="text"
        onPress={() => {
          navigation.navigate("Login");
        }}>
        Back to Login
      </Button>
    </Wrapper>
  );
};
