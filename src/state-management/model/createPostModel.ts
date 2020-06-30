import { Action, action, Computed, computed, Thunk, thunk } from "easy-peasy";

export interface CreatePostInterface {
  postType: string;
  contentName: string;
  //   addTodo: Action<TodosModel, string>; // 👈 declaring our action
}

const createPostModel: CreatePostInterface = {
  postType: "",
  contentName: "",
};

export default createPostModel;
