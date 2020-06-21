import { ErrorMessage, Formik, Field } from "formik";
import React from "react";
import { Button, TextInput, HelperText } from "react-native-paper";
import { useRegisterMutation } from "../generated/apolloComponents";
import { LineBreak, StyledColumnView, Wrapper } from "../global-ui/ReusedUI";
import { AuthNavProps } from "../navigation/auth/AuthParamList";
import { InputField, validationSchema, MyTextField } from "./InputField";

interface RegisterViewProps {}

export const RegisterView: React.FC<AuthNavProps<"Register">> = ({
  navigation,
  route,
}) => {
  // register mutation
  const [registerUser, { loading, error }] = useRegisterMutation();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  async function submitRegisterUser(formData: any) {
    try {
      const response = await registerUser({
        variables: {
          data: {
            // username: formData.username,
            // password: formData.password,
            email: formData.email,
            username: "xcfvgbhjnkmfghjk",
            password: "dfghjklcvbnm,",
          },
        },
      });
      console.log(response);
    } catch (err) {
      // TODO  handle sever errors at top level
      console.log(err);
    }
  }

  return (
    <Formik
      initialValues={{ firstName: "" }}
      onSubmit={(values) => submitRegisterUser(values)}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <Wrapper>
          <MyTextField label="hello" name="firstName" />

          <Button onPress={handleSubmit as any}>Submit</Button>
        </Wrapper>
      )}
    </Formik>
  );
};
