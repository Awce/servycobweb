import {
  REGISTER_USER,
  REGISTER_USER_ERROR,
  GET_USER,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGOUT_USER
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        usuario: action.payload
      };
    case REGISTER_USER_ERROR:
      return {
        ...state
      };
    case GET_USER:
      return {
        ...state
      };
    case LOGIN_USER:
      return {
        ...state,
        usuario: action.payload,
        islogged: true
      };
    case LOGIN_USER_ERROR:
      return {
        ...state
      };
    case LOGOUT_USER:
      return {
        ...state
      };
    default:
      return state;
  }
};
