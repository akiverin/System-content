import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createVideo } from "@/redux/actions/videoActions";
import Button from "@/components/Button";
import "./VideoUploadForm.scss";

const VideoUploadForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    tags: "",
    videoFile: null,
    thumbnailFile: null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Очищаем ошибки при вводе
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleVideoFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Проверяем тип файла
    const validTypes = ["video/mp4", "video/mov", "video/avi", "video/mkv"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        videoFile:
          "Пожалуйста, загрузите видео в формате MP4, MOV, AVI или MKV",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, videoFile: file }));
    setErrors((prev) => ({ ...prev, videoFile: "" }));

    // Создаем превью видео
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);

    // Очищаем URL-объект при размонтировании
    return () => URL.revokeObjectURL(videoURL);
  }, []);

  const handleThumbnailChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Проверяем тип файла
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        thumbnailFile:
          "Пожалуйста, загрузите изображение в формате JPG, PNG или GIF",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, thumbnailFile: file }));
    setErrors((prev) => ({ ...prev, thumbnailFile: "" }));

    // Создаем превью изображения
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Название видео обязательно";
    }

    if (!formData.desc.trim()) {
      newErrors.desc = "Описание видео обязательно";
    }

    if (!formData.videoFile && !videoPreview) {
      newErrors.videoFile = "Загрузите видеофайл";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, videoPreview]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("desc", formData.desc);

        // Разбиваем теги по запятой и удаляем пробелы
        if (formData.tags) {
          const tagsArray = formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");
          tagsArray.forEach((tag) => formDataToSend.append("tags", tag));
        }

        if (formData.videoFile) {
          formDataToSend.append("video", formData.videoFile);
        }

        if (formData.thumbnailFile) {
          formDataToSend.append("thumbnail", formData.thumbnailFile);
        }

        await dispatch(createVideo(formDataToSend));

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        setErrors({
          submit: error.message || "Ошибка при загрузке видео",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [dispatch, formData, onSuccess, validateForm]
  );

  return (
    <form className="video-upload" onSubmit={handleSubmit}>
      <div className="video-upload__content">
        <div className="video-upload__form-group">
          <label className="video-upload__label" htmlFor="title">
            Название видео*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`video-upload__input ${
              errors.title ? "video-upload__input--error" : ""
            }`}
            placeholder="Введите название видео"
          />
          {errors.title && (
            <span className="video-upload__error">{errors.title}</span>
          )}
        </div>

        <div className="video-upload__form-group">
          <label className="video-upload__label" htmlFor="desc">
            Описание видео*
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            className={`video-upload__textarea ${
              errors.desc ? "video-upload__textarea--error" : ""
            }`}
            placeholder="Опишите содержание видео"
            rows="4"
          />
          {errors.desc && (
            <span className="video-upload__error">{errors.desc}</span>
          )}
        </div>

        <div className="video-upload__form-group">
          <label className="video-upload__label" htmlFor="tags">
            Теги (через запятую)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="video-upload__input"
            placeholder="Например: обучение, программирование, дизайн"
          />
        </div>

        <div className="video-upload__media-container">
          <div className="video-upload__form-group video-upload__form-group--file">
            <label className="video-upload__label" htmlFor="videoFile">
              Загрузить видео*
            </label>
            <div className="video-upload__file-upload">
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                onChange={handleVideoFileChange}
                className={`video-upload__file-input ${
                  errors.videoFile ? "video-upload__file-input--error" : ""
                }`}
                accept="video/mp4,video/mov,video/avi,video/mkv"
              />
              <div className="video-upload__file-placeholder">
                {formData.videoFile
                  ? formData.videoFile.name
                  : "Выберите или перетащите файл"}
              </div>
            </div>
            {errors.videoFile && (
              <span className="video-upload__error">{errors.videoFile}</span>
            )}

            {videoPreview && (
              <div className="video-upload__preview">
                <video
                  src={videoPreview}
                  controls
                  className="video-upload__video-preview"
                />
              </div>
            )}
          </div>

          <div className="video-upload__form-group video-upload__form-group--file">
            <label className="video-upload__label" htmlFor="thumbnailFile">
              Загрузить превью (миниатюру)
            </label>
            <div className="video-upload__file-upload">
              <input
                type="file"
                id="thumbnailFile"
                name="thumbnailFile"
                onChange={handleThumbnailChange}
                className={`video-upload__file-input ${
                  errors.thumbnailFile ? "video-upload__file-input--error" : ""
                }`}
                accept="image/jpeg,image/png,image/jpg,image/gif"
              />
              <div className="video-upload__file-placeholder">
                {formData.thumbnailFile
                  ? formData.thumbnailFile.name
                  : "Выберите или перетащите изображение"}
              </div>
            </div>
            {errors.thumbnailFile && (
              <span className="video-upload__error">
                {errors.thumbnailFile}
              </span>
            )}

            {thumbnailPreview && (
              <div className="video-upload__preview">
                <img
                  src={thumbnailPreview}
                  alt="Превью"
                  className="video-upload__image-preview"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {errors.submit && (
        <div className="video-upload__submit-error">{errors.submit}</div>
      )}

      <div className="video-upload__actions">
        <Button
          type="submit"
          className="video-upload__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Загрузка..." : "Загрузить видео"}
        </Button>
      </div>
    </form>
  );
};

export default VideoUploadForm;
