import React from "react";
import { Text, View } from "react-native";
import { Card, Caption } from "react-native-paper";

interface UserViewProps {}

export const UserView: React.FC<UserViewProps> = ({}) => {
  return (
    <Card>
      <Caption>Hi im the user page whats up </Caption>
    </Card>
  );
};
