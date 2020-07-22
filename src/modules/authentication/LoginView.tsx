import { ErrorMessage, Formik } from "formik";
import React, { useContext } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import FacebookAuthButton from "../../functional-components/FacebookAuthButton";
import { GoogleAuthButton } from "../../functional-components/GoogleAuthButton";
import {
  LoginMutationVariables,
  useLoginMutation,
} from "../../generated-components/apolloComponents";
import { AuthNavProps } from "../../navigation/auth/AuthParamList";
import {
  LineBreak,
  StyledColumnView,
  Wrapper,
} from "../../styled-components/ReusedUI";
import { setAccessToken } from "../../utils/accessToken";
import { AuthContext } from "../../utils/AuthProvider";
import { LoginValidationSchema } from "../../utils/FormValidationSchemas";
import { useLoginHook } from "../../functional-components/useLoginHook";

// interface LoginViewProps {}
// interface submitLoginUserProps {
//   email: string;
//   password: string;
// }

export const LoginView: React.FC<AuthNavProps<"Login">> = ({ navigation }) => {
  // coming from global state management
  const { setUser } = useContext(AuthContext);
  const [loginUser, { loading, error }] = useLoginMutation();
  const setLoginUser = useLoginHook();

  async function submitLoginUser({ email, password }: LoginMutationVariables) {
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
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  if (error) {
    navigation.navigate("LoginFailed");
  }

  return (
    <Wrapper>
      <Formik
        initialValues={{ password: "", email: "" }}
        onSubmit={({ email, password }) => {
          console.log("signin button press");
          email = email.toLowerCase();
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
