import React from "react";

const Icon = ({ children, width, height, name }) => {
  return (
    <>
      <svg
        className="icon"
        xmlns="http://www.w3.org/2000/svg"
        width={width || 24}
        height={height || 24}
        viewBox="0 0 24 24"
      >
        {children}
      </svg>
      {name && <p className="visually-hidden">{name}</p>}
    </>
  );
};

export default Icon;
