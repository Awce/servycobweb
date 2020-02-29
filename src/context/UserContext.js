import React, { useState } from "react";

let UserContext = React.createContext();
let { Provider, Consumer } = UserContext;

const UserProvider = ({ children }) => {
  let [user, setUser] = useState(null);

  function login() {
    setUser({ name: "Raul Hernandez" });
  }

  function logout() {
    setUser(null);
  }

  return <Provider value={(user, login, logout)}>{children}</Provider>;
};

export { UserProvider, Consumer as UserConsumer, UserContext };
