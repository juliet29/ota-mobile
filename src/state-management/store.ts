import { createStore } from "easy-peasy"; // 👈 import
import createPostModel, { CreatePostInterface } from "./model/createPostModel";

export interface StoreInterface {
  createPost: CreatePostInterface;
}

export const storeModel: StoreInterface = {
  createPost: createPostModel,
};

const store = createStore(storeModel); // 👈 create our store

export default store;
