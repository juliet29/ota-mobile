import React from "react";
import { Wrapper, StyledColumnView } from "../styled-components/ReusedUI";
import { Text } from "react-native";
import { Formik } from "formik";
import { MyTextField } from "../functional-components/MyTextField";
import { Button } from "react-native-paper";
import { CreatePostValidationSchema } from "../utils/FormValidationSchemas";

interface CreatePostViewProps {}

export const CreatePostView: React.FC<CreatePostViewProps> = ({}) => {
  async function submitCreatePost({ text, link }) {
    console.log({ text, link });
  }
  return (
    <Wrapper>
      <Formik
        initialValues={{ text: "", link: "" }}
        onSubmit={({ text, link }) => {
          submitCreatePost({ text, link });
        }}
        validationSchema={CreatePostValidationSchema}>
        {({ handleSubmit }) => (
          <StyledColumnView>
            <MyTextField label="text" name="text" />
            <MyTextField label="link" name="link" />
            <Button mode="contained" onPress={handleSubmit}>
              CREATE POST
            </Button>
          </StyledColumnView>
        )}
      </Formik>
    </Wrapper>
  );
};
