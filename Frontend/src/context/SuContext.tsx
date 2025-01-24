import React, { createContext, useContext, useState, ReactNode } from "react";

interface SuContextType {
  user: string;
  theme: "light" | "dark";
  setUser: (user: string) => void;
  toggleTheme: () => void;
}

const SuContext = createContext<SuContextType | undefined>(undefined);

interface SuProviderProps {
  children: ReactNode;
}

export const SuProvider: React.FC<SuProviderProps> = ({ children }) => {
  const [user, setUser] = useState("Guest");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <SuContext.Provider value={{ user, theme, setUser, toggleTheme }}>
      {children}
    </SuContext.Provider>
  );
};

export const useSuContext = (): SuContextType => {
  const context = useContext(SuContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
