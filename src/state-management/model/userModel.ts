import { Action, action, Computed, computed, Thunk, thunk } from "easy-peasy";
import { TopFive } from "../../generated-components/apolloComponents";

// TODO: define interfaces by post type?
export interface UserTypeInterface {
  id?: number;
  username?: string;
  email?: string;
  profilePicture?: string;
  accessToken?: string;
  followers?: number[];
  topArtists?: TopFive[];
  topAlbums?: TopFive[];
  topTracks?: TopFive[];
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
