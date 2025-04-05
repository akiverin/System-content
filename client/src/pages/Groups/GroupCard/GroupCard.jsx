// GroupCard.jsx
import React from "react";
import "./GroupCard.scss";

const GroupCard = ({ groupName, members = [] }) => {
  const visibleMembers = members.slice(0, 6);
  const extraMembers = members.length > 6 ? members.length - 6 : 0;

  return (
    <div className="group-card">
      <h3 className="group-card__name">{groupName}</h3>
      <div className="group-card__members">
        {visibleMembers.map((member, index) => (
          <div
            key={member._id}
            className="group-card__member-avatar"
            style={{
              zIndex: visibleMembers.length - index,
              backgroundColor: member.color || "#e0e0e0",
              left: `${index * 1.2}em`,
            }}
          >
            {member.image ? (
              <img
                src={member.image.url}
                alt={member.firstName}
                className="group-card__avatar-image"
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${member.firstName}+${
                  member.lastName
                }&background=${member.color || "e0e0e0"}`}
                alt={member.firstName}
                className="group-card__avatar-image"
              />
            )}
          </div>
        ))}

        {extraMembers > 0 && (
          <div
            className="group-card__member-avatar group-card__member-avatar--extra"
            style={{ left: `${visibleMembers.length * 1.2}em` }}
          >
            +{extraMembers}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
