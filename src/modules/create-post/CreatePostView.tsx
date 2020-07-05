import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, HelperText, TextInput, Text } from "react-native-paper";
import {
  GetPostsDocument,
  useCreatePostMutation,
  CreatePostMutationVariables,
} from "../../generated-components/apolloComponents";
import { CreatePostNavProps } from "../../navigation/app/create-post/CreatePostParamList";
import { useStoreState, useStoreActions } from "../../state-management/hooks";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
import { CreatePostValidationSchema } from "../../utils/FormValidationSchemas";
import { CreatePostOptions } from "./CreatePostOptions";
import { ContentPreview } from "./ContentPreview";
import { TrackVotes } from "./ratings/TrackVotes";
import { AlbumStars } from "./ratings/AlbumStars";

interface CreatePostViewProps {}

export const CreatePostView: React.FC<CreatePostNavProps<"CreatePost">> = ({
  navigation,
}) => {
  const [createPost, { loading, error }] = useCreatePostMutation();
  const content = useStoreState((state) => state.createPost.content);
  const postType = useStoreState((state) => state.createPost.postType);
  const [toDisplay, setToDisplay] = useState(0);
  const setContent = useStoreActions(
    (actions) => actions.createPost.setContent
  );
  // determine what options to show
  useEffect(() => {
    setContent({ ...content, name: "" });
  }, [toDisplay, setToDisplay]);

  // TODO: handle loading
  const submitCreatePost = async ({
    text,
    link,
  }: CreatePostMutationVariables) => {
    try {
      const response = await createPost({
        variables: { text, link },
        refetchQueries: [{ query: GetPostsDocument }],
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    // TODO: move to feed view on success
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

            {/* show selected content or options for creating Post */}
            {content.name ? (
              <ContentPreview
                onPress={(value) => {
                  setToDisplay(value);
                }}
              />
            ) : (
              <CreatePostOptions />
            )}

            {/* give option to rate/vote on albums/tracks */}
            {postType === "track" ? (
              <TrackVotes />
            ) : postType === "album" ? (
              <AlbumStars />
            ) : (
              <></>
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
