import React from "react";
import { Wrapper, StyledColumnView } from "../styled-components/ReusedUI";
import { Text } from "react-native";
import { Formik } from "formik";
import { MyTextField } from "../functional-components/MyTextField";
import { Button } from "react-native-paper";
import { CreatePostValidationSchema } from "../utils/FormValidationSchemas";
import { useCreatePostMutation } from "../generated-components/apolloComponents";

interface CreatePostViewProps {}

interface submitCreatePostProps {
  text: string;
  link: string;
}

export const CreatePostView: React.FC<CreatePostViewProps> = ({}) => {
  const [createPost, { loading, error }] = useCreatePostMutation();
  async function submitCreatePost({ text, link }: submitCreatePostProps) {
    try {
      const response = await createPost({ variables: { text, link } });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
