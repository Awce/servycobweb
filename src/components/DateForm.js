import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const DateForm = ({ placeholder, onChange, defaultValue, format }) => {
  return (
    <DatePicker
      placeholder="Fecha"
      onChange={(date, dateString) => onChange(date, dateString)}
      defaultValue={moment("01/01/2022", "DD/MM/YYYY")}
      format="DD/MM/YYYY"
      size="large"
    ></DatePicker>
  );
};

export default DateForm;
