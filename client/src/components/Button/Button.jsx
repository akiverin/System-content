import React from "react";
import "./Button.scss";

function Button({ children, className, ...props }) {
  return (
    <button className={`button${className ? " " + className : ""}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
