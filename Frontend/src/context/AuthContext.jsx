import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const getStoredAuth = () => {
  const storedAuth =
    localStorage.getItem("auth") || sessionStorage.getItem("auth");

  if (!storedAuth) {
    return {
      user: null,
      token: null,
    };
  }

  try {
    return JSON.parse(storedAuth);
  } catch {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");

    return {
      user: null,
      token: null,
    };
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth);

  const login = (userData, token, rememberMe) => {
    const authData = {
      user: userData,
      token,
    };

    // Clear previous authentication
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("auth", JSON.stringify(authData));

    setAuth(authData);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");

    setAuth({
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
