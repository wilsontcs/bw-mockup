"use client";

import { createContext, useContext } from "react";
import { User } from "../models/user";
import { SignupRequest, login, signup, logout } from "../services/fake-auth";
import { useUserStore } from "../store/user";

type UserDataContextProps = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
};

const UserDataContext = createContext<UserDataContextProps | undefined>(
  undefined,
);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);

  const handleLogin = async (email: string, password: string) => {
    const loggedUser = await login(email, password);
    setUser(loggedUser);
  };

  const handleSignup = async (data: SignupRequest) => {
    const newUser = await signup(data);
    setUser(newUser);
  };

  const handleLogout = async () => {
    await logout();
    clearUser();
  };

  return (
    <UserDataContext.Provider
      value={{
        user,
        isAuthenticated: !!user?.email,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData must be used inside UserDataProvider");
  return ctx;
}
