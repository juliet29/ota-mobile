import { Action, action, Computed, computed, Thunk, thunk } from "easy-peasy";

export interface CreatePostInterface {
  postType: string;
  setPostType: Action<CreatePostInterface, string>;

  contentName: string;
  setContentName: Action<CreatePostInterface, string>;
}

const createPostModel: CreatePostInterface = {
  postType: "",
  setPostType: action((state, payload) => {
    state.postType = payload;
  }),

  contentName: "",
  setContentName: action((state, payload) => {
    state.contentName = payload;
  }),
};

export default createPostModel;
