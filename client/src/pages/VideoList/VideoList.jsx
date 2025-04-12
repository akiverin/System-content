import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "@/redux/actions/videoActions";
import Button from "@components/Button";
import VideoCard from "./VideoCard";
import "./VideoList.scss";

const VideoList = () => {
  const dispatch = useDispatch();
  const {
    allVideos = [],
    loading,
    error,
  } = useSelector((state) => state.video);
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
            <VideoCard key={video._id} video={video} />
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
    </div>
  );
};

export default VideoList;
