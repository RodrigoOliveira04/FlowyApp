import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  username: string;
  email: string;
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  register: (data: { username: string; email: string; password: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Carregar usuário salvo ao abrir o aplicativo
  useEffect(() => {
    AsyncStorage.getItem("user").then((saved) => {
      if (saved) setUser(JSON.parse(saved));
    });
  }, []);

  const register = async (data: { username: string; email: string; password: string }) => {
    const newUser = {
      username: data.username,
      email: data.email,
      createdAt: new Date().toISOString(),
    };

    // Salvar dados do usuário
    await AsyncStorage.setItem("user", JSON.stringify(newUser));
    await AsyncStorage.setItem("password", data.password); // simples (pode melhorar depois)

    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const savedUser = await AsyncStorage.getItem("user");
    const savedPass = await AsyncStorage.getItem("password");

    if (!savedUser || !savedPass) return false; 

    const userObj = JSON.parse(savedUser);

    if (userObj.email === email && savedPass === password) {
      setUser(userObj);
      return true;
    }

    return false;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("password");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
};
