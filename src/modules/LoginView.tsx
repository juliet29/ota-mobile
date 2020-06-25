import { Formik, FormikProps, ErrorMessage } from "formik";
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
  // const [loginUser, { loading, error }] = useLoginMutation();

  // async function submitLoginUser({ email, password }: submitLoginUserProps) {
  //   try {
  //     const response = await loginUser({ variables: { email, password } });
  //     console.log(response);
  //     if (response.data?.login === null) {
  //       console.log("hi");
  //       return (
  //         <Wrapper>
  //           <Title>User not Found</Title>
  //         </Wrapper>
  //       );
  //     }
  //     // TODO: throw user not found error on backend
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   console.log("done");

  // }

  return (
    <Wrapper>
      <Formik
        initialValues={{ password: "", email: "" }}
        onSubmit={({ email, password }) => {
          console.log("signin button press");
          login({ email, password }, false);
        }}
        validationSchema={LoginValidationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
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
