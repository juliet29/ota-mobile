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
} from "../generated-components/apolloComponents";
import { Wrapper, StyledColumnView } from "../styled-components/ReusedUI";
import { AuthNavProps } from "../navigation/auth/AuthParamList";
import { RegisterValidationSchema } from "../utils/FormValidationSchemas";

interface RegisterViewProps {}

export const RegisterView: React.FC<AuthNavProps<"Register">> = ({
  navigation,
}) => {
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
              label="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            <HelperText>
              <ErrorMessage name="username" />
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

            <TextInput
              label="Confirm Password"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry={true}
            />
            <HelperText>
              <ErrorMessage name="confirmPassword" />
            </HelperText>

            <Button onPress={handleSubmit as any}>REGISTER</Button>
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
  );
};
