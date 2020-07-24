import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import {
  LoginMutationVariables,
  useLoginMutation,
} from "../../generated-components/apolloComponents";
import { useLoginHook } from "../../modules/authentication/components//useLoginHook";
import FacebookAuthButton from "../../modules/authentication/components/FacebookAuthButton";
import { GoogleAuthButton } from "../../modules/authentication/components/GoogleAuthButton";
import { AuthNavProps } from "../../navigation/auth/AuthParamList";
import {
  LineBreak,
  StyledColumnView,
  Wrapper,
} from "../../styled-components/ReusedUI";
import { LoginValidationSchema } from "../../utils/FormValidationSchemas";

// interface LoginViewProps {}
// interface submitLoginUserProps {
//   email: string;
//   password: string;
// }

export const LoginView: React.FC<AuthNavProps<"Login">> = ({ navigation }) => {
  // coming from global state management
  const [loginUser, { loading, error }] = useLoginMutation();

  const [setLoginUser] = useLoginHook();
  // const setCurrentUser = useSetUserHook();

  const submitLoginUser = async ({
    email,
    password,
  }: LoginMutationVariables) => {
    try {
      const response = await loginUser({ variables: { email, password } });
      console.log(response);
      if (
        response &&
        response.data &&
        response.data.login &&
        response.data.login.accessToken
      ) {
        const accessToken = response.data.login.accessToken;
        setLoginUser(accessToken);

        // get current user function
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  if (error) {
    navigation.navigate("LoginFailed");
  }

  const loginAndSetUser = async ({ email, password }) => {
    await submitLoginUser({ email, password });
    // setCurrentUser();
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{ password: "", email: "" }}
        onSubmit={({ email, password }) => {
          console.log("signin button press");
          email = email.toLowerCase();
          loginAndSetUser({ email, password });
        }}
        validationSchema={LoginValidationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <StyledColumnView>
            {/* <Field name="email" label="" component={MyTextField} /> */}

            <TextInput
              label="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              // TODO: CHANGE ON SERVER
              value={values.email.toLowerCase()}
            />
            <HelperText>
              <ErrorMessage name="email" />
            </HelperText>

            <TextInput
              label="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
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

      <StyledColumnView>
        <FacebookAuthButton />
        {/* only works in Safari for whatever reason */}
        {/* <SpotifyAuthButton /> */}
        <LineBreak />
        <GoogleAuthButton />
      </StyledColumnView>

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
