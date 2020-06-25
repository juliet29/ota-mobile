import { Formik } from "formik";
import React from "react";
import { Button } from "react-native-paper";
import { MyTextField } from "../functional-components/MyTextField";
import {
  GetPostsDocument,
  useCreatePostMutation,
} from "../generated-components/apolloComponents";
import { StyledColumnView, Wrapper } from "../styled-components/ReusedUI";
import { CreatePostValidationSchema } from "../utils/FormValidationSchemas";

interface CreatePostViewProps {}

interface submitCreatePostProps {
  text: string;
  link: string;
}

export const CreatePostView: React.FC<CreatePostViewProps> = ({}) => {
  const [createPost, { loading, error }] = useCreatePostMutation();
  async function submitCreatePost({ text, link }: submitCreatePostProps) {
    try {
      const response = await createPost({
        variables: { text, link },
        refetchQueries: [{ query: GetPostsDocument }],
      });
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
