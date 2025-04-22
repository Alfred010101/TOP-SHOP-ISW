import { createContext, useContext, useState, ReactNode } from "react";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (formData: RegisterFormData) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  setError: (message: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        if (token) {
          localStorage.setItem("token", token);
          setIsAuthenticated(true);
          setError(null);
          return true;
        } else {
          setError("Token no recibido");
          return false;
        }
      } else {
        const message = await response.text();
        setError(message || "Error al iniciar sesión");
        return false;
      }
    } catch (error) {
      setError("Login failed");
      return false;
    }
  };

  const register = async (formData: RegisterFormData): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        setError(null);
        return true;
      } else {
        const msg = await res.text();
        setError(msg || "Error al registrar");
        return false;
      }
    } catch (err) {
      setError("No se pudo conectar al servidor");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, register, logout, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
