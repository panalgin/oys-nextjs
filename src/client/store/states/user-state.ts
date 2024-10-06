import { User } from "../../../common/user";

export interface UserState {
  user: User | null;
  isLoading: boolean;
}