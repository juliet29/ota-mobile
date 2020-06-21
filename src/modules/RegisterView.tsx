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
import { useMutation } from "@apollo/react-hooks";
import { REGISTER } from "../graphql/user/mutations/register";

interface RegisterViewProps {}

export const RegisterView: React.FC<AuthNavProps<"Register">> = ({
  navigation,
  route,
}) => {
  // form stuff
  // const { register, setValue, handleSubmit, errors } = useForm();

  const testVar = {
    data: {
      username: "hiwasgood",
      password: "password",
      email: "fake@email.com",
    },
  };

  // register mutation
  const [registerUser, { loading, error }] = useRegisterMutation();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // TODO define what happens on submit
  // const onSubmit = (formData: any) => {
  //   console.log("submitted!");
  //   // registerUser({
  //   //   variables: {
  //   //     data: {
  //   //       username: formData.username,
  //   //       password: formData.password,
  //   //       email: formData.email,
  //   //     },
  //   //   },
  //   // });
  //   // actually log in so can get a cookie :)
  //   // navigation.navigate("Login");
  // };

  // how the form updates + validation
  // useEffect(() => {
  //   register({ name: "username" });
  //   register({ name: "email" });
  //   register({ name: "password" });
  //   register({ name: "passwordConfirm" });
  // }, [register]);
  async function createNewUser() {
    const res = await registerUser({
      variables: {
        data: {
          username: "hiwasgood",
          password: "password",
          email: "fake4@email.com",
        },
      },
    });
    return res;
  }

  return (
    <Wrapper>
      <Button onPress={createNewUser}>TEST</Button>
      {/* <StyledColumnView>
        <TextInput
          label="Username"
          mode="outlined"
          onChangeText={(text) => setValue("username", text)}
        />
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={(text) => setValue("email", text)}
        />
        <TextInput
          label="Password"
          mode="outlined"
          onChangeText={(text) => setValue("password", text)}
        />
        <TextInput
          label="Confirm Password"
          mode="outlined"
          onChangeText={(text) => setValue("passwordConfirm", text)}
        />
        <LineBreak />
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          SIGN UP
        </Button>
      </StyledColumnView> */}
    </Wrapper>
  );
};
