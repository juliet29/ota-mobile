import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Center } from "../global-ui/Center";
import { TextInput, Button } from "react-native-paper";
import { AuthContext } from "../AuthProvider";
import { Wrapper, StyledColumnView, LineBreak } from "../global-ui/ReusedUI";
import { AuthNavProps } from "../navigation/AuthParamList";

interface RegisterViewProps {}

export const RegisterView: React.FC<AuthNavProps<"Register">> = ({
  navigation,
  route,
}) => {
  return (
    <Wrapper>
      <StyledColumnView>
        <TextInput label="Username" mode="outlined" />
        <TextInput label="Email" mode="outlined" />
        <TextInput label="Password" mode="outlined" />
        <TextInput label="Re-enter Password" mode="outlined" />
        <LineBreak />
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("Login");
          }}>
          SIGN UP
        </Button>
      </StyledColumnView>
    </Wrapper>
  );
};
