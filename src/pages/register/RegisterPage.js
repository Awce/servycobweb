import React from "react";
import RegisterUserButton from "../../components/register/RegisterUserButton";
import RegisterDictationButton from "../../components/register/RegisterDictationButton";

const RegisterPage = () => {
  return (
    <div>
      <h1>Soy el layout del registro</h1>
      <RegisterUserButton />
      <RegisterDictationButton />
    </div>
  );
};

export default RegisterPage;
