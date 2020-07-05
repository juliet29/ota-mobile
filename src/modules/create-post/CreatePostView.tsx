import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, HelperText, TextInput, Text } from "react-native-paper";
import {
  GetPostsDocument,
  useCreatePostMutation,
} from "../../generated-components/apolloComponents";
import { CreatePostNavProps } from "../../navigation/app/create-post/CreatePostParamList";
import { useStoreState } from "../../state-management/hooks";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
import { CreatePostValidationSchema } from "../../utils/FormValidationSchemas";
import { CreatePostOptions } from "./CreatePostOptions";
import { ContentPreview } from "./ContentPreview";

interface CreatePostViewProps {}

interface submitCreatePostProps {
  text: string;
  link: string;
}

export const CreatePostView: React.FC<CreatePostNavProps<"CreatePost">> = ({
  navigation,
}) => {
  const [createPost, { loading, error }] = useCreatePostMutation();
  const postType = useStoreState((state) => state.createPost.postType);
  console.log("my type is ", postType);
  const content = useStoreState((state) => state.createPost.content);
  console.log("my content is ", content);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    console.log("display changed");
    setDisplay(true);
  }, [display]);

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
            {/* // TODO conditionally render this... */}
            {content.name ? (
              <ContentPreview props={display} />
            ) : (
              <CreatePostOptions />
            )}

            <Button mode="contained" onPress={handleSubmit}>
              CREATE POST
            </Button>
          </StyledColumnView>
        )}
      </Formik>
    </Wrapper>
  );
};
