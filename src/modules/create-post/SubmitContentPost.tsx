import React, { ReactNode } from "react";
import {
  useCreateTrackPostMutation,
  useCreateArtistPostMutation,
  useCreateAlbumPostMutation,
  GetPostsDocument,
  TrackPostInput,
  ArtistPostInput,
  AlbumPostInput,
} from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";

interface SubmitContentPostProps {}
type useSubmitContentType = (param: string) => () => any;

export const useSubmitContentPost: useSubmitContentType = (text) => {
  const content = useStoreState((state) => state.createPost.content);
  const [createArtistPost] = useCreateArtistPostMutation();
  const [createAlbumPost] = useCreateAlbumPostMutation();
  const [createTrackPost] = useCreateTrackPostMutation();
  const postType = useStoreState((state) => state.createPost.postType);

  const submitArtistPost = async (text: string) => {
    const { name: artistName, imageUrl, id: artistId } = content;
    const data: ArtistPostInput = { text, artistName, imageUrl, artistId };
    try {
      const response = await createArtistPost({
        variables: { data },
        refetchQueries: [{ query: GetPostsDocument }],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const submitTrackPost = async (text: string) => {
    const {
      name: trackName,
      id: trackId,
      imageUrl,
      vote,
      artistNames,
    } = content;
    const data: TrackPostInput = {
      trackName,
      trackId,
      text,
      imageUrl,
      vote,
      artistNames,
    };
    try {
      const response = await createTrackPost({
        variables: { data },
        refetchQueries: [{ query: GetPostsDocument }],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const submitAlbumPost = async (text: string) => {
    const {
      name: albumName,
      id: albumId,
      imageUrl,
      rating,
      artistNames,
    } = content;
    const data: AlbumPostInput = {
      albumId,
      albumName,
      text,
      imageUrl,
      rating,
      artistNames,
    };
    try {
      const response = await createAlbumPost({
        variables: { data },
        refetchQueries: [{ query: GetPostsDocument }],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const submitContent = () => {
    // console.log(content);
    const finalResponse =
      postType === "track"
        ? submitTrackPost(text)
        : postType === "album"
        ? submitAlbumPost(text)
        : submitArtistPost(text);

    return finalResponse;
  };

  // console.log("finres", final_response);

  return submitContent;
};
