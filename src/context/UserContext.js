import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { firebaseLogout, firebaseCurrentUser } from "../services/firebase";

let UserContext = createContext();

let { Provider, Consumer } = UserContext;

const UserProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let history = useHistory();

  function login() {
    firebaseCurrentUser();
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
  }

  function logout() {
    setUser(null);
    firebaseLogout();
    history.goBack();
  }

  return (
    <Provider value={{ user, setUser, login, logout }}>{children}</Provider>
  );
};

export { UserProvider, Consumer as UserConsumer, UserContext };
