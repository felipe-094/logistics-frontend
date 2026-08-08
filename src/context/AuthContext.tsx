import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode } from "react";
import type { User } from "../types/User";

interface AuthContextType {
  user: User | null;
  token: string | null;

  login: (user: User, token: string) => void;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
   return localStorage.getItem("token");
 });

function login(user: User, token: string) {
  setUser(user);
  setToken(token);

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

function logout() {
  setUser(null);
  setToken(null);

  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}