import { Action, action, Computed, computed, Thunk, thunk } from "easy-peasy";

export interface CreatePostInterface {
  postType: string;
  contentName: string;
}

const createPostModel: CreatePostInterface = {
  postType: "",
  contentName: "",
};

export default createPostModel;
