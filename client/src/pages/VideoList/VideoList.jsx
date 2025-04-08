import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, deleteVideo } from "@/redux/actions/videoActions";
// import { formatDuration } from "@/utils/formatters";
import Button from "@components/Button";
import Modal from "@components/Modal";
import VideoCard from "./VideoCard";
import VideoUploadForm from "./VideoUploadForm";
import "./VideoList.scss";

const VideoList = () => {
  const dispatch = useDispatch();
  const {
    allVideos = [],
    loading,
    error,
  } = useSelector((state) => state.video);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);

  // Загрузка видео при монтировании компонента
  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  // Фильтрация видео при изменении поискового запроса или списка видео
  useEffect(() => {
    if (allVideos?.videos?.length) {
      if (searchQuery.trim() === "") {
        setFilteredVideos(allVideos.videos);
      } else {
        const filtered = allVideos.videos.filter((video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredVideos(filtered);
      }
    } else {
      setFilteredVideos([]);
    }
  }, [searchQuery, allVideos]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleVideoDelete = useCallback(
    (videoId) => {
      if (window.confirm("Вы уверены, что хотите удалить видео?")) {
        dispatch(deleteVideo(videoId));
      }
    },
    [dispatch]
  );

  const handleUploadSuccess = useCallback(() => {
    setShowUploadModal(false);
    dispatch(getAllVideos()); // Обновляем список после загрузки нового видео
  }, [dispatch]);

  return (
    <div className="video-list">
      <div className="video-list__header">
        <h1 className="video-list__title">Видеотека</h1>
        <div className="video-list__actions">
          <div className="video-list__search">
            <input
              type="text"
              placeholder="Поиск видео..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="video-list__search-input"
            />
          </div>
          <Button
            className="video-list__upload-btn"
            onClick={() => setShowUploadModal(true)}
          >
            Добавить видео
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="video-list__loading">Загрузка видео...</div>
      ) : error ? (
        <div className="video-list__error">{error}</div>
      ) : filteredVideos.length === 0 ? (
        <div className="video-list__empty">
          {searchQuery ? "Видео не найдены" : "Нет доступных видео"}
        </div>
      ) : (
        <div className="video-list__grid">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
              onDelete={() => handleVideoDelete(video._id)}
            />
          ))}
        </div>
      )}

      {/* Пагинация */}
      {allVideos?.pages > 1 && (
        <div className="video-list__pagination">
          {[...Array(allVideos.pages).keys()].map((page) => (
            <Button
              key={page + 1}
              className={`video-list__page-btn ${
                allVideos.page === page + 1
                  ? "video-list__page-btn--active"
                  : ""
              }`}
              onClick={() => dispatch(getAllVideos(page + 1))}
            >
              {page + 1}
            </Button>
          ))}
        </div>
      )}

      {/* Модальное окно для загрузки видео */}
      {showUploadModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowUploadModal(false)}
          title="Добавление нового видео"
        >
          <VideoUploadForm onSuccess={handleUploadSuccess} />
        </Modal>
      )}
    </div>
  );
};

export default VideoList;
