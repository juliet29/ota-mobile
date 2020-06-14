import React, { useContext } from "react";
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../AuthProvider";
import { LineBreak, StyledColumnView, Wrapper } from "../global-ui/ReusedUI";
import { AuthNavProps } from "../navigation/auth/AuthParamList";

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
            console.log("sign in button pressed");
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
