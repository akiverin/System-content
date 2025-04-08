import React from "react";
import { Link } from "react-router-dom";
import { formatDuration, formatDate } from "@/utils/formatters";
import defaultThumbnail from "@assets/default-thumbnail.webp";
import "./VideoCard.scss";

const VideoCard = ({ video, onDelete }) => {
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
      {onDelete && (
        <button
          className="video-card__delete"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(_id);
          }}
          aria-label="Удалить видео"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default VideoCard;
