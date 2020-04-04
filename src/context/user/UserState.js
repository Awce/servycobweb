import React, { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import {
  REGISTER_USER,
  REGISTER_USER_ERROR,
  GET_USER,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGOUT_USER
} from "../../types";

import {
  firebaseRegister,
  firebaseLogin,
  firebaseCurrentUser,
  firebaseLogout
} from "../../services/firebase";

const UserState = props => {
  const initialState = {
    user: null,
    islogged: null
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const registrarUsuario = async item => {
    try {
      const respuesta = await firebaseRegister(item);
      console.log(respuesta);
      dispatch({
        type: REGISTER_USER
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_USER_ERROR
      });
    }
  };

  const loginUsuario = userId => {
    try {
      dispatch({
        type: LOGIN_USER,
        payload: userId
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_USER_ERROR
      });
    }
  };

  const obtenerUsuario = () => {
    dispatch({
      type: GET_USER
    });
  };

  const cerrarSesion = () => {
    dispatch({
      type: LOGOUT_USER
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        islogged: state.islogged,
        registrarUsuario,
        loginUsuario,
        obtenerUsuario,
        cerrarSesion
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
