import { auth } from "../firebase-utils/utils";
import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((changedUser) => {
      setUser(changedUser);
    });
  }, [user]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
