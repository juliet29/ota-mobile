import { Action, action, Computed, computed, Thunk, thunk } from "easy-peasy";

// TODO: define interfaces by post type?
export interface UserTypeInterface {
  id?: number;
  username?: string;
  email?: string;
  accessToken?: string;
}

export interface UserInterface {
  user: UserTypeInterface;
  setUser: Action<UserInterface, UserTypeInterface>;
  clearUser: Action<UserInterface>;
}

const userModel: UserInterface = {
  user: {},
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  clearUser: action((state) => {
    state.user = {};
  }),
};

export default userModel;
