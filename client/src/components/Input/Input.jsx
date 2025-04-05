import React from "react";
import "./Input.scss";

const Input = ({ type = "text", placeholder, value, onChange, name }) => {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default Input;
