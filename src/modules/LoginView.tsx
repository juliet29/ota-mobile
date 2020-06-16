import React, { useContext, useEffect } from "react";
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../AuthProvider";
import { LineBreak, StyledColumnView, Wrapper } from "../global-ui/ReusedUI";
import { AuthNavProps } from "../navigation/auth/AuthParamList";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Alert,
  Text,
  Button as Button2,
  TextInput as TextInput2,
} from "react-native";
import { seedValue } from "faker";

interface LoginViewProps {}

export const LoginView: React.FC<AuthNavProps<"Login">> = ({ navigation }) => {
  // coming from global state management
  const { login } = useContext(AuthContext);
  // react hook form
  const { register, setValue, handleSubmit, errors } = useForm();
  // TODO: fix type
  const onSubmit = (data: any) => {
    Alert.alert("Form Data", JSON.stringify(data));
    //login()
  };

  useEffect(() => {
    register({ name: "Email" });
    register({ name: "Password" });
  }, [register]);

  return (
    <Wrapper>
      <StyledColumnView>
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={(text) => setValue("Email", text)}
        />
        <TextInput
          label="Password"
          mode="outlined"
          onChangeText={(text) => setValue("Password", text)}
        />
        <LineBreak />
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
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
