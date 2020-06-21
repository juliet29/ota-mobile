import { Formik } from "formik";
import React from "react";
import { Button } from "react-native-paper";
import {
  RegisterInput,
  useRegisterMutation,
} from "../generated-components/apolloComponents";
import { Wrapper } from "../styled-components/ReusedUI";
import { AuthNavProps } from "../navigation/auth/AuthParamList";
import { MyTextField } from "../functional-components/MyTextField";
import { RegisterValidationSchema } from "../utils/FormValidationSchemas";

interface RegisterViewProps {}

export const RegisterView: React.FC<AuthNavProps<"Register">> = ({
  navigation,
}) => {
  const [registerUser, { loading, error }] = useRegisterMutation();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
      initialValues={{ username: "", password: "", email: "" }}
      onSubmit={(values) => {
        submitRegisterUser(values);
      }}
      validationSchema={RegisterValidationSchema}>
      {({ handleSubmit }) => (
        <Wrapper>
          <MyTextField label="Username" name="username" />
          <MyTextField label="Email" name="email" />
          <MyTextField label="Password" name="password" />

          <Button onPress={handleSubmit as any}>REGISTER</Button>
        </Wrapper>
      )}
    </Formik>
  );
};
