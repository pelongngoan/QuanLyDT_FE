import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../models/User";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    email: string,
    userName: string,
    password: string,
    role: "ADMIN" | "USER"
  ) => void;
  loginUser: (userName: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};
type Props = { children: React.ReactNode };
const UserContext = createContext<UserContextType>({} as UserContextType);
export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setIsReady(true);
  }, []);
  const registerUser = (
    email: string,
    userName: string,
    password: string,
    role: "ADMIN" | "USER"
  ) => {
    const newUser = { userName, email, password, role };
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/");
  };

  const loginUser = async (email: string, password: string) => {
    try {
      // Send a POST request to your backend API
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { account, message } = response.data;
      const accessToken = response.headers.authorization;

      if (accessToken) {
        setToken(accessToken);
        setUser(account);
        navigate("/dashboard");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("Invalid email or password");
    }
  };
  const isLoggedIn = () => {
    return !!user;
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    navigate("/");
  };
  return (
    <UserContext.Provider
      value={{ registerUser, loginUser, isLoggedIn, user, token, logout }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
export const useAuth = () => React.useContext(UserContext);
