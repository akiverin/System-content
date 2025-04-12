import { Avatar } from "@adminjs/design-system";
import React from "react";

export const AvatarCell = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "fit-content",
        minWidth: "30%",
        maxWidth: "500px",
      }}
    >
      <Avatar
        alt={
          data.firstName && data.lastName
            ? data.firstName.charAt(0) + data.lastName.charAt(0)
            : ""
        }
        src={data["image.url"]}
      >
        {data.firstName && data.lastName
          ? data.firstName.charAt(0) + data.lastName.charAt(0)
          : ""}
      </Avatar>
    </div>
  );
};
