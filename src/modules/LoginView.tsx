import { Formik } from "formik";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { AuthContext } from "../AuthProvider";
import { MyTextField } from "../functional-components/MyTextField";
import { AuthNavProps } from "../navigation/auth/AuthParamList";
import {
  LineBreak,
  StyledColumnView,
  Wrapper,
} from "../styled-components/ReusedUI";
import { LoginValidationSchema } from "../utils/FormValidationSchemas";

interface LoginViewProps {}

export const LoginView: React.FC<AuthNavProps<"Login">> = ({ navigation }) => {
  // coming from global state management
  const { login } = useContext(AuthContext);

  async function submitLoginUser(data: any) {
    console.log(data);
    console.log("hi");
    return true;
  }

  return (
    <Wrapper>
      <Formik
        initialValues={{ password: "", email: "" }}
        onSubmit={(values) => {
          submitLoginUser(values);
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
