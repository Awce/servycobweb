import React from "react";
import RegisterUserButton from "../../components/register/RegisterUserButton";
import RegisterDictationButton from "../../components/register/RegisterDictationButton";
import RegisterAssignmentsSteps from "../../components/register/RegisterAssignmentsSteps";
import RegisterAssignmentsButton from "../../components/register/RegisterAssignmentsButton";

const RegisterPage = () => {
  return (
    <div>
      <h1>Soy el layout del registro</h1>
      <RegisterUserButton />
      <RegisterDictationButton />
      <RegisterAssignmentsButton />
      <RegisterAssignmentsSteps />
    </div>
  );
};

export default RegisterPage;
