import React from "react";
import "./PostCard.scss";
import docIcon from "@assets/doc.svg";
import VideoIcon from "@components/icons/VideoIcon";

function PostCard(postContent) {
  const post = postContent.post;

  return (
    <div className="post-card">
      <div className="post-card__content">
        {post.type == "video" ? (
          <div className="post-card__image post-card__image--default">
            <VideoIcon height={34} width={34} />
          </div>
        ) : post.type == "post" ? (
          <img
            src={docIcon}
            alt="post card image"
            className="post-card__image post-card__image--default"
          />
        ) : (
          <div className="post-card__image post-card__image--default">
            <Course height={34} width={34} />
          </div>
        )}
        <div className="post-card__info">
          <p className="post-card__title">{post.title}</p>
          <p className="post-card__desc">{post.desc}</p>
        </div>
      </div>

      {post.tags && (
        <ul className="post-card__tags">
          {post.tags.map((tag, index) => (
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
