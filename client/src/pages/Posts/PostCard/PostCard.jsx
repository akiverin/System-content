import React from "react";
import "./PostCard.scss";
import docIcon from "@assets/doc.svg";

function PostCard(props) {
  console.log(props);
  return (
    <div className="post-card">
      <div className="post-card__content">
        {props.image ? (
          <img
            src={props.image}
            alt="post card image"
            className="post-card__image"
          />
        ) : (
          <img
            src={docIcon}
            alt="post card image"
            className="post-card__image post-card__image--default"
          />
        )}
        <div className="post-card__info">
          <p className="post-card__title">{props.title}</p>
          <p className="post-card__desc">{props.desc}</p>
        </div>
      </div>

      {props.tags && (
        <ul className="post-card__tags">
          {props.tags.map((tag, index) => (
            <li className="post-card__tag" key={index}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostCard;
