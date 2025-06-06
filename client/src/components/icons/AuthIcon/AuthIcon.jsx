import React from "react";
import Icon from "../Icon";

const AuthIcon = (props) => {
  return (
    <Icon {...props}>
      <g fill="none">
        <path
          fill="#D9D9D9"
          d="M12 2a4 4 0 0 0-4 4v1.5h1.5V6a2.5 2.5 0 0 1 5 0v1.5H16V6a4 4 0 0 0-4-4"
        />
        <path
          fill="url(#fluentColorLockClosed240)"
          d="M12 2a4 4 0 0 0-4 4v1.5h1.5V6a2.5 2.5 0 0 1 5 0v1.5H16V6a4 4 0 0 0-4-4"
        />
        <path
          fill="#D9D9D9"
          d="M20 10.25A3.25 3.25 0 0 0 16.75 7h-9.5A3.25 3.25 0 0 0 4 10.25v7.5A3.25 3.25 0 0 0 7.25 21h9.5A3.25 3.25 0 0 0 20 17.75z"
        />
        <path
          fill="url(#fluentColorLockClosed241)"
          d="M20 10.25A3.25 3.25 0 0 0 16.75 7h-9.5A3.25 3.25 0 0 0 4 10.25v7.5A3.25 3.25 0 0 0 7.25 21h9.5A3.25 3.25 0 0 0 20 17.75z"
        />
        <path fill="#212121" d="M12 15.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" />
        <path
          fill="url(#fluentColorLockClosed242)"
          d="M12 15.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
        />
        <defs>
          <linearGradient
            id="fluentColorLockClosed240"
            x1="9.714"
            x2="15.835"
            y1=".949"
            y2="11.057"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFC205" />
            <stop offset="1" stopColor="#FB5937" />
          </linearGradient>
          <linearGradient
            id="fluentColorLockClosed241"
            x1="21.143"
            x2="6.542"
            y1="21.875"
            y2="8.278"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF6F47" />
            <stop offset="1" stopColor="#FFCD0F" />
          </linearGradient>
          <radialGradient
            id="fluentColorLockClosed242"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-1.49996 -5.25 7.28439 -2.0812 12.75 15.5)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#944600" />
            <stop offset="1" stopColor="#CD8E02" />
          </radialGradient>
        </defs>
      </g>
    </Icon>
  );
};

export default AuthIcon;
