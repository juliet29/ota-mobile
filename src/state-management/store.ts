import { createStore } from "easy-peasy"; // 👈 import
import createPostModel, { CreatePostInterface } from "./model/createPostModel";
import userModel, { UserInterface } from "./model/userModel";

export interface StoreInterface {
  createPost: CreatePostInterface;
  user: UserInterface;
}

export const storeModel: StoreInterface = {
  createPost: createPostModel,
  user: userModel,
};

const store = createStore(storeModel); // 👈 create our store

export default store;
