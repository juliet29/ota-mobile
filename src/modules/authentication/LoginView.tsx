import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";
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
  AuthTextInput,
} from "../../styled-components/ReusedUI";
import { LoginValidationSchema } from "../../utils/FormValidationSchemas";
import { Image, ImageBackground } from "react-native";
import { blueA800 } from "../../styled-components/colors";
import { styles } from "../../styled-components/StyleSheet";
import { color } from "react-native-reanimated";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

export const LoginView: React.FC<AuthNavProps<"Login">> = ({ navigation }) => {
  // coming from global state management

  const [loginUser, { loading, error }] = useLoginMutation();

  const [setLoginUser] = useLoginHook();
  // const setCurrentUser = useSetUserHook();
  const { colors } = useTheme();
  const themeContext = useContext(ThemeContext);

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
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
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

              <AuthTextInput
                // underlineColor={"rgba(90, 90, 90, 0.01)"}
                placeholder="EMAIL"
                placeholderTextColor={themeContext.colors.darkText}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email.toLowerCase()}
              />
              <HelperText>
                <ErrorMessage name="email" />
              </HelperText>

              {/* <AuthTextInput
                placeholder="EMAIL"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email.toLowerCase()}
              /> */}

              <AuthTextInput
                placeholder="PASSWORD"
                placeholderTextColor={themeContext.colors.darkText}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
              />
              <HelperText>
                <ErrorMessage name="password" />
              </HelperText>

              <LineBreak />
              <Button
                disabled={loading}
                mode="contained"
                onPress={handleSubmit}>
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
    </ImageBackground>
  );
};
