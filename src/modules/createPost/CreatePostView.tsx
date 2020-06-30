import { Formik, ErrorMessage } from "formik";
import React from "react";
import { Button, TextInput, HelperText } from "react-native-paper";
import { MyTextField } from "../../functional-components/MyTextField";
import {
  GetPostsDocument,
  useCreatePostMutation,
} from "../../generated-components/apolloComponents";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
import { CreatePostValidationSchema } from "../../utils/FormValidationSchemas";
import { CreatePostOptions } from "./CreatePostOptions";
import { useStoreState } from "../../state-management/hooks";

interface CreatePostViewProps {}

interface submitCreatePostProps {
  text: string;
  link: string;
}

export const CreatePostView: React.FC<CreatePostViewProps> = ({}) => {
  const [createPost, { loading, error }] = useCreatePostMutation();
  const postType = useStoreState((state) => state.createPost.postType);
  console.log("my type is ", postType);

  const submitCreatePost = async ({ text, link }: submitCreatePostProps) => {
    try {
      const response = await createPost({
        variables: { text, link },
        refetchQueries: [{ query: GetPostsDocument }],
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <Formik
        initialValues={{ text: "", link: "" }}
        onSubmit={({ text, link }) => {
          submitCreatePost({ text, link });
        }}
        validationSchema={CreatePostValidationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <StyledColumnView>
            <TextInput
              label="Text"
              onChangeText={handleChange("text")}
              onBlur={handleBlur("text")}
              value={values.text}
            />
            <HelperText>
              <ErrorMessage name="text" />
            </HelperText>

            <TextInput
              label="Link"
              onChangeText={handleChange("link")}
              onBlur={handleBlur("link")}
              value={values.link}
            />
            <HelperText>
              <ErrorMessage name="link" />
            </HelperText>
            <CreatePostOptions />

            <Button mode="contained" onPress={handleSubmit}>
              CREATE POST
            </Button>
          </StyledColumnView>
        )}
      </Formik>
    </Wrapper>
  );
};
