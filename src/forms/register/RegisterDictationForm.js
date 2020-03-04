import React from "react";
import useDictation from "../../hooks/useDictation";

const RegisterDictationForm = () => {
  const [dication, SelectDictation, refreshState] = useDictation();
  return <SelectDictation />;
};

export default RegisterDictationForm;
