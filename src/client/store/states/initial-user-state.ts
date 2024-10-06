import { UserState } from "./user-state";

export const initialUserState: UserState = {
  user: null,
  isLoading: false,
  isFetched: false,
  setUser: () => {},
  logout: () => Promise.resolve(),
};