import {
  AlbumPostInput,
  ArtistPostInput,
  GetPostsDocument,
  GetPostsOfFollowingDocument,
  GetUserPostsDocument,
  TrackPostInput,
  useCreateAlbumPostMutation,
  useCreateArtistPostMutation,
  useCreateTrackPostMutation,
  useGetCurrentUserQuery,
} from "../../generated-components/apolloComponents";
import { useStoreState } from "../../state-management/hooks";

interface SubmitContentPostProps {}
type useSubmitContentType = () => () => any;

export const useSubmitContentPost: useSubmitContentType = () => {
  const content = useStoreState((state) => state.createPost.content);
  const postType = useStoreState((state) => state.createPost.postType);
  const userState = useStoreState((state) => state.user.user);
  const currUser = useGetCurrentUserQuery();
  const id: number = currUser ? +currUser.data.getCurrentUser.id : 1;
  console.log("id of mine", id);

  const [createArtistPost] = useCreateArtistPostMutation();
  const [createAlbumPost] = useCreateAlbumPostMutation();
  const [createTrackPost] = useCreateTrackPostMutation();

  // console.log("content", content);
  // console.log("userState", userState.id);

  const submitArtistPost = async () => {
    const {
      name: artistName,
      imageUrl,
      id: artistId,
      text,
      externalUrl,
    } = content;
    const data: ArtistPostInput = {
      text,
      artistName,
      imageUrl,
      artistId,
      externalUrl,
    };
    try {
      const response = await createArtistPost({
        variables: { data },
        refetchQueries: [
          { query: GetPostsDocument },
          { query: GetPostsOfFollowingDocument },
          { query: GetUserPostsDocument, variables: { id } },
        ],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const submitTrackPost = async () => {
    const {
      name: trackName,
      id: trackId,
      imageUrl,
      vote,
      text,
      artistNames,
      externalUrl,
    } = content;

    const data: TrackPostInput = {
      trackName,
      trackId,
      text,
      imageUrl,
      vote,
      artistNames,
      externalUrl,
    };
    try {
      const response = await createTrackPost({
        variables: { data },
        refetchQueries: [
          { query: GetPostsDocument },
          { query: GetPostsOfFollowingDocument },
          { query: GetUserPostsDocument, variables: { id } },
        ],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const submitAlbumPost = async () => {
    // const id = userState.id;
    const {
      name: albumName,
      id: albumId,
      imageUrl,
      rating,
      artistNames,
      text,
      externalUrl,
    } = content;
    const data: AlbumPostInput = {
      albumId,
      albumName,
      text,
      imageUrl,
      rating,
      artistNames,
      externalUrl,
    };
    try {
      const response = await createAlbumPost({
        variables: { data },
        refetchQueries: [
          { query: GetPostsDocument },
          { query: GetPostsOfFollowingDocument },
          { query: GetUserPostsDocument, variables: { id } },
        ],
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
        ? submitTrackPost()
        : postType === "album"
        ? submitAlbumPost()
        : submitArtistPost();

    return finalResponse;
  };

  // console.log("finres", final_response);

  return submitContent;
};
