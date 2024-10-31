import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const LOCAL_STORAGE_KEY = "users";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [userDatabase, setUserDatabase] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setUserDatabase(storedUsers);
  }, []);

  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  };
  const signup = useMutation({
    mutationFn: (newUser) => {
      return new Promise((resolve, reject) => {
        const existingUser = userDatabase.find(
          (user) => user.username === newUser.username
        );

        if (existingUser) {
          reject(new Error("Username already exists"));
          alert("User slready exists");
        } else if (newUser.username && newUser.password) {
          const updatedUserDatabase = [...userDatabase, newUser];
          setUserDatabase(updatedUserDatabase);
          setUser(newUser);
          saveUsersToLocalStorage(updatedUserDatabase);
          resolve(newUser);
        } else {
          reject(new Error("Username and password are required"));
        }
        setError("");
      });
    },

    onError: (error) => {
      setError(error.message);
    },
  });
  console.log(userDatabase);
  const signin = useMutation({
    mutationFn: (credentials) => {
      return new Promise((resolve, reject) => {
        const foundUser = userDatabase.find(
          (user) => user.username === credentials.username
        );

        if (foundUser && foundUser.password === credentials.password) {
          setUser(foundUser);
          console.log("User Info:", [foundUser]);
          resolve(true);
        } else {
          reject(new Error("Invalid username or password"));
        }
        setError("");
      });
    },

    onError: (error) => {
      setError(error.message);
    },
  });
  const logout = () => {
    setUser(null);
    setError("");
    alert("User logged out");
    router.push("/");
  };
  return (
    <AuthContext.Provider value={{ user, signup, signin, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
