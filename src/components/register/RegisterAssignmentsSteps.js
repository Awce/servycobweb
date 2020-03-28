import React, { useState } from "react";
import { Steps, Icon } from "antd";

const { Step } = Steps;

const RegisterAssignmentsSteps = () => {
  const [currentStep, setCurrentStep] = useState({
    current: 0
  });

  const onChange = () => {
    console.log("step:", currentStep);
    setCurrentStep(currentStep);
  };

  const { current } = currentStep;

  return (
    <Steps current={current} onChange={onChange}>
      <Step
        title="Subir a base de datos"
        icon={<Icon type="file-excel" theme="twoTone" twoToneColor="#52c41a" />}
      />
      <Step
        title="Asignar a gestores"
        icon={<Icon type="interaction" theme="twoTone" />}
      />
      <Step
        title="Lista de asignación"
        icon={<Icon type="profile" theme="twoTone" />}
      />
    </Steps>
  );
};

export default RegisterAssignmentsSteps;
