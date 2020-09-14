import { useNavigation } from "@react-navigation/native";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { CreatePostNavProps } from "../../navigation/app/create-post/CreatePostParamList";
import { useStoreActions, useStoreState } from "../../state-management/hooks";
import {
  AuthTextInput,
  StyledColumnView,
  Wrapper,
} from "../../styled-components/ReusedUI";
import { CreatePostValidationSchema } from "../../utils/FormValidationSchemas";
import { ContentPreview } from "./ContentPreview";
import { CreatePostOptions } from "./CreatePostOptions";
import { AlbumStars } from "./ratings/AlbumStars";
import { TrackVotes } from "./ratings/TrackVotes";
import { useSubmitContentPost } from "./useSubmitContentPost";
import { ImageBackground } from "react-native";
import { styles } from "../../styled-components/StyleSheet";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface CreatePostViewProps {}

export const CreatePostView: React.FC<CreatePostNavProps<
  "CreatePost"
>> = ({}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const submitContent = useSubmitContentPost();
  let content = useStoreState((state) => state.createPost.content);
  const postType = useStoreState((state) => state.createPost.postType);
  const [toDisplay, setToDisplay] = useState(0);
  const setContent = useStoreActions(
    (actions) => actions.createPost.setContent
  );
  // determine what options to show
  useEffect(() => {
    setContent({ ...content, name: "" });
  }, [toDisplay, setToDisplay]);

  // make sure text is set before submitting content
  useEffect(() => {
    if (content.text) {
      console.log("content", content);
      const actuallySubmit = async () => {
        console.log("just set text", content);
        const response = await submitContent();
        console.log(response);
        if (response.data) {
          alert("Success");
          navigation.navigate("Home");
        }
        // TODO: handle loading + failure
      };
      actuallySubmit();
    }
  }, [content]);

  const submitCreatePost = async ({ text }) => {
    setContent({ ...content, text });
    console.log("finished setting text");
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../local-assets/wavy.png")}>
      <Wrapper>
        <Formik
          initialValues={{ text: "" }}
          onSubmit={({ text }) => {
            submitCreatePost({ text });
          }}
          validationSchema={CreatePostValidationSchema}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledColumnView>
              <AuthTextInput
                placeholder="Add your review..."
                placeholderTextColor={themeContext.colors.text}
                onChangeText={handleChange("text")}
                onBlur={handleBlur("text")}
                value={values.text}
              />
              <HelperText>
                <ErrorMessage name="text" />
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

              {/* give option to rate or vote on albums or tracks once content is selected*/}
              {content.name && postType === "track" ? (
                <TrackVotes />
              ) : content.name && postType === "album" ? (
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
    </ImageBackground>
  );
};
