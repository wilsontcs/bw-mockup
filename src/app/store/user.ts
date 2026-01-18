import { create } from "zustand";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,

  setUser: (user) => {
    const existing = get().user;
    // Prevent overwrite if same email
    if (existing?.email === user.email) return;
    set({ user });
  },

  clearUser: () => set({ user: null }),
}));
