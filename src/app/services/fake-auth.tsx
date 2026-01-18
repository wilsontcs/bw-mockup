import { User } from "../models/user";

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  country: string;
  password: string;
}

let mockUser: (User & { password: string }) | null = null;

// --- SIGNUP ---
export function signup(data: SignupRequest): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // ✅ Prevent duplicate email
      if (mockUser && mockUser.email === data.email) {
        reject("This email is already registered.");
        return;
      }

      mockUser = {
        id: Date.now(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };

      const { password, ...user } = mockUser;
      resolve(user);
    }, 800);
  });
}

// --- LOGIN ---
export function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!mockUser || mockUser.email !== email) {
        reject("User not found. Please sign up first.");
        return;
      }

      if (mockUser.password !== password) {
        reject("Incorrect password.");
        return;
      }

      const { password: _, ...user } = mockUser;
      resolve(user);
    }, 800);
  });
}

// --- LOGOUT ---
export function logout(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  });
}
