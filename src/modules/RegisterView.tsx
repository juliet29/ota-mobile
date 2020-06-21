import { gql } from "apollo-boost";
import React, { useEffect } from "react";
import { Button, TextInput } from "react-native-paper";
import { LineBreak, StyledColumnView, Wrapper } from "../global-ui/ReusedUI";
import { AuthNavProps } from "../navigation/auth/AuthParamList";
import {
  useRegisterMutation,
  RegisterInput,
} from "../generated/apolloComponents";
import { useForm } from "react-hook-form";
import { useMutation, RenderPromises } from "@apollo/react-hooks";
import { REGISTER } from "../graphql/user/mutations/register";
import { Formik } from "Formik";
import { ValuesOfCorrectTypeRule } from "graphql";

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
      const res = await registerUser({
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
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Success");
    }
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => submitRegisterUser(values)}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Wrapper>
          <StyledColumnView>
            <TextInput
              label="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
          </StyledColumnView>
          <LineBreak />

          <Button onPress={handleSubmit as any}>Submit</Button>
        </Wrapper>
      )}
    </Formik>
  );
};
