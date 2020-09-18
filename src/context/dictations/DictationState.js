import React, { useReducer } from "react";
import DictationContext from "./DictationContext";
import { SELECCIONAR_DAMA } from "../../types";
import DictationReducer from "./DictationReducer";

const DictationState = ({ children }) => {
  // state de Dictamenes
  const initialState = {
    cliente: [],
    dama: [],
  };
  const [state, dispatch] = useReducer(DictationReducer, initialState);

  const holaMundo = () => {
    console.log("Hola Mundo");
  };

  return (
    <DictationContext.Provider value={{ holaMundo }}>
      {children}
    </DictationContext.Provider>
  );
};

export default DictationState;
