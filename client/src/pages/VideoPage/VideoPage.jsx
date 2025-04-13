import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "@/redux/actions/videoActions";
import { formatDuration, formatDate } from "@/utils/formatters";
import "./VideoPage.scss";

const VideoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { video, loading, error } = useSelector((state) => state.video);

  useEffect(() => {
    if (id) {
      dispatch(getVideo(id));
    }
  }, [dispatch, id]);

  if (loading)
    return <div className="video-page__loading">Загрузка видео...</div>;
  if (error) return <div className="video-page__error">{error}</div>;
  if (!video || !video._id)
    return <div className="video-page__not-found">Видео не найдено</div>;

  return (
    <div className="video-page">
      <div className="video-page__back">
        <button className="video-page__back-link" onClick={() => navigate(-1)}>
          ← Вернуться назад
        </button>
      </div>

      <div className="video-page__player-container">
        <div className="video-page__player-wrapper">
          <video
            src={video.videoUrl}
            className="video-page__player"
            controls
            poster={video.image?.url}
          />
        </div>
      </div>

      <div className="video-page__content">
        <div className="video-page__header">
          <h1 className="video-page__title">{video.title}</h1>
        </div>

        <div className="video-page__meta">
          <div className="video-page__author">
            {video.creator?.firstName} {video.creator?.lastName}
          </div>
          <div className="video-page__info">
            {video.duration && (
              <span className="video-page__duration">
                {formatDuration(video.duration)}
              </span>
            )}
            <span className="video-page__date">
              Опубликовано: {formatDate(video.createdAt)}
            </span>
          </div>
        </div>

        <div className="video-page__description">
          <h3 className="video-page__section-title">Описание</h3>
          <p className="video-page__desc-text">{video.desc}</p>
        </div>

        {video.tags?.length > 0 && (
          <div className="video-page__tags">
            <h3 className="video-page__section-title">Теги</h3>
            <div className="video-page__tags-list">
              {video.tags.map((tag, index) => (
                <span key={index} className="video-page__tag">
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
