import { useState, useEffect } from "react";
import { ADMIN_PASSWORD } from "@/const";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (inputPassword: string) => {
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      setPassword("");
      setError("");
      return true;
    } else {
      setError("Mật khẩu không chính xác");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
    setPassword("");
    setError("");
  };

  return { isAuthenticated, password, setPassword, error, login, logout };
};
