import { atom } from "recoil";
import { Wing } from "@/utils/enums";

interface User {
  id: string;
  role?: string;
  isAuthenticated: boolean;
  username?: string;
  name: string;
  assignedWings: Wing[];
}

export const userAtom = atom<User>({
  key: "userAtom", // Unique ID for this atom
  default: {
    id: "",
    isAuthenticated: false,
    name: "",
    assignedWings: [],
  },
});
