import React, { useState } from "react";
import {
  TextInput,
  Title,
  Button,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import {
  StyledColumnView,
  LineBreak,
} from "../../../styled-components/ReusedUI";
import { Formik, ErrorMessage } from "formik";
import {
  LoginValidationSchema,
  EditNameValidationSchema,
} from "../../../utils/FormValidationSchemas";
import { useStoreState } from "../../../state-management/hooks";
import { useGetCurrentUserQuery } from "../../../generated-components/apolloComponents";

interface EditNamesProps {}
// TODO make placeholder existing username
export const EditNames: React.FC<EditNamesProps> = ({}) => {
  const { data, loading, error } = useGetCurrentUserQuery();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    // console.log(error);
    return <></>;
  }

  const initialName: string =
    data.getCurrentUser.googleId || data.getCurrentUser.facebookId
      ? data.getCurrentUser.username
      : "";
  const initialUsername: string = initialName
    ? ""
    : data.getCurrentUser.username;

  return (
    <StyledColumnView>
      <Title>Edit your Username and Name</Title>

      <Formik
        initialValues={{ name: initialName, username: initialUsername }}
        onSubmit={({ name, username }) => {
          console.log("usename form submit");
        }}
        validationSchema={EditNameValidationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <StyledColumnView>
            <TextInput
              label="name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              // TODO: CHANGE ON SERVER
              value={values.name}
            />
            <HelperText>
              <ErrorMessage name="name" />
            </HelperText>

            <TextInput
              label="username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            <HelperText>
              <ErrorMessage name="username" />
            </HelperText>

            <LineBreak />
            <Button
              //   disabled={!values.name && !values.username}
              mode="contained"
              onPress={handleSubmit}>
              Save Changes
            </Button>
          </StyledColumnView>
        )}
      </Formik>

      {/* <TextInput
        label="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}></TextInput>
      <TextInput
        label="name"
        value={name}
        onChangeText={(name) => setName(name)}></TextInput>
      <Button mode="contained" disabled={!name && !username}>
        Save Changes
      </Button> */}
      <Button>Skip For Now</Button>
    </StyledColumnView>
  );
};
