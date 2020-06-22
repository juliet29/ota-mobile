import { Formik } from "formik";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { AuthContext } from "../utils/AuthProvider";
import { MyTextField } from "../functional-components/MyTextField";
import { AuthNavProps } from "../navigation/auth/AuthParamList";
import {
  LineBreak,
  StyledColumnView,
  Wrapper,
} from "../styled-components/ReusedUI";
import { LoginValidationSchema } from "../utils/FormValidationSchemas";
import { useLoginMutation } from "../generated-components/apolloComponents";
import FacebookAuthButton from "../functional-components/FacebookAuthButton";
import SpotifyAuthButton from "../functional-components/SpotifyAuthButton";

interface LoginViewProps {}
interface submitLoginUserProps {
  email: string;
  password: string;
}

export const LoginView: React.FC<AuthNavProps<"Login">> = ({ navigation }) => {
  // coming from global state management
  const { login } = useContext(AuthContext);
  const [loginUser, { loading, error }] = useLoginMutation();

  async function submitLoginUser({ email, password }: submitLoginUserProps) {
    try {
      const response = await loginUser({ variables: { email, password } });
      // TODO: throw user not found error on backend
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    console.log("done");
    login();
  }

  return (
    <Wrapper>
      <Formik
        initialValues={{ password: "", email: "" }}
        onSubmit={({ email, password }) => {
          submitLoginUser({ email, password });
        }}
        validationSchema={LoginValidationSchema}>
        {({ handleSubmit }) => (
          <StyledColumnView>
            <MyTextField label="Email" name="email" />
            <MyTextField label="Password" name="password" />
            <LineBreak />
            <Button mode="contained" onPress={handleSubmit}>
              SIGN IN
            </Button>
          </StyledColumnView>
        )}
      </Formik>

      <FacebookAuthButton />
      <SpotifyAuthButton />

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
