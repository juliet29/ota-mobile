import { Formik, FormikProps, ErrorMessage, Field } from "formik";
import React, { useContext } from "react";
import { Button, Title, TextInput, HelperText } from "react-native-paper";
import { AuthContext } from "../utils/AuthProvider";
import { MyTextField } from "../functional-components/MyTextField";
import { AuthNavProps } from "../navigation/auth/AuthParamList";
import {
  LineBreak,
  StyledColumnView,
  Wrapper,
} from "../styled-components/ReusedUI";
import { LoginValidationSchema } from "../utils/FormValidationSchemas";
import {
  useLoginMutation,
  LoginMutationVariables,
} from "../generated-components/apolloComponents";
import FacebookAuthButton from "../functional-components/FacebookAuthButton";
import SpotifyAuthButton from "../functional-components/SpotifyAuthButton";
import { setAccessToken } from "../utils/accessToken";

interface LoginViewProps {}
interface submitLoginUserProps {
  email: string;
  password: string;
}

export const LoginView: React.FC<AuthNavProps<"Login">> = ({ navigation }) => {
  // coming from global state management

  const [loginUser, { loading, error }] = useLoginMutation();

  async function submitLoginUser({ email, password }: LoginMutationVariables) {
    console.log("not already here");
    try {
      const response = await loginUser({ variables: { email, password } });
      console.log(response);
      if (response && response.data && response.data.login) {
        setAccessToken(response.data.login.accessToken);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Wrapper>
      <Formik
        initialValues={{ password: "", email: "" }}
        onSubmit={({ email, password }) => {
          console.log("signin button press");
          submitLoginUser({ email, password });
        }}
        validationSchema={LoginValidationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <StyledColumnView>
            {/* <Field name="email" label="" component={MyTextField} /> */}

            <TextInput
              label="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <HelperText>
              <ErrorMessage name="email" />
            </HelperText>

            <TextInput
              label="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <HelperText>
              <ErrorMessage name="password" />
            </HelperText>

            <LineBreak />
            <Button mode="contained" onPress={handleSubmit}>
              SIGN IN
            </Button>
          </StyledColumnView>
        )}
      </Formik>

      <FacebookAuthButton />
      {/* only works in Safari for whatever reason */}
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
