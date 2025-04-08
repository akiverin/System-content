import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideo, deleteVideo } from "@/redux/actions/videoActions";
import { formatDuration, formatDate } from "@/utils/formatters";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import VideoUploadForm from "../VideoList/VideoUploadForm";
import "./VideoPage.scss";

const VideoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { video, loading, error } = useSelector((state) => state.video);
  const { user } = useSelector((state) => state.auth);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getVideo(id));
    }
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить это видео?")) {
      dispatch(deleteVideo(id));
      // После успешного удаления перенаправляем на страницу списка видео
      window.location.href = "/videos";
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    dispatch(getVideo(id)); // Обновляем данные видео
  };

  const isCreator = user && video && user.id === video.creator?._id;
  const isAdmin = user && user.role === "admin";

  if (loading)
    return <div className="video-page__loading">Загрузка видео...</div>;
  if (error) return <div className="video-page__error">{error}</div>;
  if (!video || !video._id)
    return <div className="video-page__not-found">Видео не найдено</div>;

  return (
    <div className="video-page">
      <div className="video-page__back">
        <Link to="/videos" className="video-page__back-link">
          &larr; Назад к списку видео
        </Link>
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

          {(isCreator || isAdmin) && (
            <div className="video-page__actions">
              <Button
                variant="outline"
                className="video-page__edit-btn"
                onClick={() => setShowEditModal(true)}
              >
                Редактировать
              </Button>
              <Button
                variant="danger"
                className="video-page__delete-btn"
                onClick={handleDelete}
              >
                Удалить
              </Button>
            </div>
          )}
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
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {showEditModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowEditModal(false)}
          title="Редактирование видео"
        >
          <VideoUploadForm
            isEdit={true}
            videoData={video}
            onSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default VideoPage;
