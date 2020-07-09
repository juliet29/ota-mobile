import { Action, action, Computed, computed, Thunk, thunk } from "easy-peasy";

// TODO: define interfaces by post type?
interface ContentInterface {
  id?: string;
  name?: string;
  imageUrl?: string;
  text?: string;
  artistNames?: string[];
  // album specific
  rating?: number;
  //track specific
  vote?: number; // 1 or -1
}

export interface CreatePostInterface {
  postType: string;
  setPostType: Action<CreatePostInterface, string>;

  content: ContentInterface;
  setContent: Action<CreatePostInterface, ContentInterface>;
  clearContent: Action<CreatePostInterface>;
}

const createPostModel: CreatePostInterface = {
  postType: "",
  setPostType: action((state, payload) => {
    state.postType = payload;
  }),

  content: {},
  setContent: action((state, payload) => {
    state.content = payload;
  }),
  clearContent: action((state) => {
    state.content = {};
  }),
};

export default createPostModel;
