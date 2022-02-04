import React from "react";
import Select from "react-select";

const SelectForm = ({ placeholder, className, onChange, options, value }) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <Select
      placeholder={placeholder}
      className={className}
      value={defaultValue(options, value)}
      onChange={(value) => {
        onChange(value);
      }}
      options={options}
    />
  );
};

export default SelectForm;
