import React, { createContext, useState } from "react";
import { firebaseLogout } from "../services/firebase";

let UserContext = createContext();

let { Provider, Consumer } = UserContext;

const UserProvider = ({ children }) => {
  let [user, setUser] = useState(null);

  function login() {
    setUser({ name: "Raúl Hernández" });
  }

  function logout() {
    setUser(null);
    firebaseLogout();
  }

  return <Provider value={{ user, login, logout }}>{children}</Provider>;
};

export { UserProvider, Consumer as UserConsumer, UserContext };
