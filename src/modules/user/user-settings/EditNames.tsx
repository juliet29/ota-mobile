import { ErrorMessage, Formik } from "formik";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  HelperText,
  TextInput,
  Title,
  Caption,
} from "react-native-paper";
import {
  useGetCurrentUserQuery,
  GetCurrentUserDocument,
  GetCurrentUserQuery,
  useEditUserNamesMutation,
  EditUserInput,
} from "../../../generated-components/apolloComponents";
import {
  LineBreak,
  StyledColumnView,
} from "../../../styled-components/ReusedUI";
import { EditNameValidationSchema } from "../../../utils/FormValidationSchemas";
import { client } from "../../../index";
import { useStoreState } from "../../../state-management/hooks";

interface EditNamesProps {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
}
// TODO make placeholder existing username
export const EditNames: React.FC<EditNamesProps> = ({ setNext }) => {
  const [editUserNames] = useEditUserNamesMutation();
  // const { getCurrentUser: data } = client.readQuery<GetCurrentUserQuery>({
  //   query: GetCurrentUserDocument,
  // });
  const data = useStoreState((state) => state.user.user);
  // useEffect(() => {
  //   setNext(false);
  // }, []);

  const submitEditUserNames = async (name: string, username: string) => {
    const data: EditUserInput = {
      username,
      name,
    };
    try {
      const response = await editUserNames({
        variables: { data },
        refetchQueries: [{ query: GetCurrentUserDocument }],
      });
      console.log("resp", response);
      if (response.data.editUserNames) {
        setNext(true);
      }
    } catch (err) {
      return err;
    }
  };

  const initialName: string =
    data.googleId || data.facebookId ? data.username : "";
  const initialUsername: string = initialName ? "" : data.username;

  return (
    <StyledColumnView>
      <Title>Edit your Username and Name</Title>

      <Formik
        initialValues={{ name: initialName, username: initialUsername }}
        onSubmit={({ name, username }) => {
          console.log("usename form submit");
          submitEditUserNames(name, username);
        }}
        validationSchema={EditNameValidationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values, resetForm }) => (
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
              onPress={() => {
                handleSubmit();
              }}>
              Save Changes
            </Button>
          </StyledColumnView>
        )}
      </Formik>

      <Caption>Use Side Arrows to Skip for Now</Caption>
    </StyledColumnView>
  );
};
