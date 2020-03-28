import React, { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { LOGIN_USER } from "../types";

const UserState = props => {
  const initialState = {
    user: null
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const loginUsuario = () => {
    dispatch({
      type: LOGIN_USER
    });
  };
  return (
    <UserContext.Provider value={{ user: state.user, loginUsuario }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
