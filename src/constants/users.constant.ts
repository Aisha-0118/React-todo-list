import { createContext } from "react";
import type { User } from "../models/users.model";

export interface UsersContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
export const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: () => {},
});
