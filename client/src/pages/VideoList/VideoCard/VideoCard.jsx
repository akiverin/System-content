import React from "react";
import { Link } from "react-router-dom";
import { formatDuration, formatDate } from "@/utils/formatters";
import defaultThumbnail from "@assets/default-thumbnail.webp";
import "./VideoCard.scss";

const VideoCard = ({ video }) => {
  const { _id, title, desc, image, duration, creator, createdAt } = video;

  // Получаем миниатюру видео
  const thumbnailUrl = image?.url || defaultThumbnail;

  return (
    <div className="video-card">
      <Link to={`/videos/${_id}`} className="video-card__link">
        <div className="video-card__thumbnail">
          <img
            src={thumbnailUrl}
            alt={title}
            className="video-card__image"
            onError={(e) => (e.target.src = defaultThumbnail)}
          />
          {duration && (
            <span className="video-card__duration">
              {formatDuration(duration)}
            </span>
          )}
        </div>
        <div className="video-card__info">
          <h3 className="video-card__title">{title}</h3>
          <p className="video-card__desc">{desc}</p>
          <div className="video-card__meta">
            <span className="video-card__author">
              {creator?.firstName} {creator?.lastName}
            </span>
            <span className="video-card__date">{formatDate(createdAt)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
