import React from "react";
import { Card, Title } from "react-native-paper";
import { Wrapper } from "../styled-components/ReusedUI";

interface LoginFailedProps {}

export const LoginFailed: React.FC<LoginFailedProps> = ({}) => {
  return (
    <Wrapper>
      <Card>
        <Title>User Not Found, Please Refresh</Title>
      </Card>
    </Wrapper>
  );
};
