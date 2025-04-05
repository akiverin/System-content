import React from "react";
import Icon from "../Icon";

const ProfileIcon = (props) => {
  return (
    <Icon {...props}>
      <g fill="none">
        <path
          fill="url(#fluentColorPerson240)"
          d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z"
        />
        <path
          fill="url(#fluentColorPerson241)"
          d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z"
        />
        <path
          fill="url(#fluentColorPerson242)"
          d="M12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
        />
        <defs>
          <linearGradient
            id="fluentColorPerson240"
            x1="7.808"
            x2="10.394"
            y1="15.064"
            y2="23.319"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".125" stopColor="#9C6CFE" />
            <stop offset="1" stopColor="#7A41DC" />
          </linearGradient>
          <linearGradient
            id="fluentColorPerson241"
            x1="12.003"
            x2="15.623"
            y1="13.047"
            y2="26.573"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#885EDB" stopOpacity="0" />
            <stop offset="1" stopColor="#E362F8" />
          </linearGradient>
          <linearGradient
            id="fluentColorPerson242"
            x1="9.379"
            x2="14.475"
            y1="3.334"
            y2="11.472"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".125" stopColor="#9C6CFE" />
            <stop offset="1" stopColor="#7A41DC" />
          </linearGradient>
        </defs>
      </g>
    </Icon>
  );
};

export default ProfileIcon;
