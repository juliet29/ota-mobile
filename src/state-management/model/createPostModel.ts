import { Action, action, Computed, computed, Thunk, thunk } from "easy-peasy";

interface ContentInterface {
  id: string;
  name: string;
  imageUrl: string | null | undefined;
}

export interface CreatePostInterface {
  postType: string;
  setPostType: Action<CreatePostInterface, string>;

  content: ContentInterface;
  setContent: Action<CreatePostInterface, ContentInterface>;
}

const createPostModel: CreatePostInterface = {
  postType: "",
  setPostType: action((state, payload) => {
    state.postType = payload;
  }),

  content: { id: "", name: "", imageUrl: "" },
  setContent: action((state, payload) => {
    state.content = payload;
  }),
};

export default createPostModel;
