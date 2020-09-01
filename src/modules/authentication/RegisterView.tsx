import { Formik, ErrorMessage } from "formik";
import React from "react";
import {
  Button,
  TextInput,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import {
  RegisterInput,
  useRegisterMutation,
} from "../../generated-components/apolloComponents";
import {
  Wrapper,
  StyledColumnView,
  AuthTextInput,
} from "../../styled-components/ReusedUI";
import { AuthNavProps } from "../../navigation/auth/AuthParamList";
import { RegisterValidationSchema } from "../../utils/FormValidationSchemas";
import { ImageBackground } from "react-native";
import { styles } from "../../styled-components/StyleSheet";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface RegisterViewProps {}

export const RegisterView: React.FC<AuthNavProps<"Register">> = ({
  navigation,
}) => {
  const themeContext = useContext(ThemeContext);
  const [registerUser, { loading, error }] = useRegisterMutation();
  if (loading) return <ActivityIndicator size="large" />;
  if (error) {
    navigation.navigate("LoginFailed");
  }

  async function submitRegisterUser(data: RegisterInput) {
    try {
      const response = await registerUser({
        variables: {
          data,
        },
      });
      console.log(response);
    } catch (err) {
      // TODO  handle server errors at top level
      console.log(err);
    }
    navigation.navigate("Login");
  }

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
          confirmPassword: "",
        }}
        onSubmit={({ username, password, email }) => {
          email = email.toLowerCase();
          submitRegisterUser({ username, password, email });
        }}
        validationSchema={RegisterValidationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Wrapper>
            <StyledColumnView>
              <AuthTextInput
                placeholder="EMAIL"
                placeholderTextColor={themeContext.colors.darkText}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <HelperText>
                <ErrorMessage name="email" />
              </HelperText>

              <AuthTextInput
                placeholder="USERNAME"
                placeholderTextColor={themeContext.colors.darkText}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              <HelperText>
                <ErrorMessage name="username" />
              </HelperText>

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

              <AuthTextInput
                placeholder="CONFIRM PASSWORD"
                placeholderTextColor={themeContext.colors.darkText}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={true}
              />
              <HelperText>
                <ErrorMessage name="confirmPassword" />
              </HelperText>

              <Button mode="contained" onPress={handleSubmit as any}>
                REGISTER
              </Button>
            </StyledColumnView>

            <Button
              mode="text"
              onPress={() => {
                navigation.navigate("Login");
              }}>
              Back to Login Page
            </Button>
          </Wrapper>
        )}
      </Formik>
    </ImageBackground>
  );
};
