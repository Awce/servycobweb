import React from "react";
import { Statistic } from "antd";

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const TimeInSession = () => {
  const onFinish = () => {
    console.log("finished!");
  };

  return (
    <>
      <Countdown title="Descanso en:" value={deadline} onFinish={onFinish} />
    </>
  );
};

export default TimeInSession;
