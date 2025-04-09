import React, { useState } from "react";
import "./CreateCourseModal.scss";
import { useDispatch } from "react-redux";
import { createCourse } from "../../../redux/actions/courseActions";
import { FaUpload } from "react-icons/fa";

function CreateCourseModal({ onClose, onCourseCreated }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Необходимо указать название курса");
      return;
    }

    setIsSubmitting(true);

    // Prepare form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);

    if (tags.trim()) {
      const tagsArray = tags.split(",").map((tag) => tag.trim());
      formData.append("tags", JSON.stringify(tagsArray));
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Initialize with empty content array
    formData.append("content", JSON.stringify([]));

    dispatch(createCourse(formData))
      .then(() => {
        setIsSubmitting(false);
        onCourseCreated();
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(error.message || "Ошибка при создании курса");
      });
  };

  return (
    <div className="create-course-modal">
      <div className="create-course-modal__content">
        <div className="create-course-modal__header">
          <h2>Создание нового курса</h2>
          <button
            className="create-course-modal__close"
            onClick={onClose}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        {error && <div className="create-course-modal__error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-course-modal__form">
          <div className="create-course-modal__form-group">
            <label htmlFor="title">Название курса*</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название курса"
              required
            />
          </div>

          <div className="create-course-modal__form-group">
            <label htmlFor="desc">Описание курса</label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Введите описание курса"
              rows={4}
            />
          </div>

          <div className="create-course-modal__form-group">
            <label htmlFor="tags">Теги (через запятую)</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Например: программирование, веб-разработка"
            />
          </div>

          <div className="create-course-modal__form-group">
            <label>Обложка курса</label>
            <div className="create-course-modal__upload-area">
              <label
                htmlFor="image-upload"
                className="create-course-modal__upload-label"
              >
                <FaUpload />
                <span>Выбрать изображение</span>
              </label>
              <input
                type="file"
                id="image-upload"
                className="create-course-modal__upload-input"
                onChange={handleImageChange}
                accept="image/*"
              />

              {previewImage && (
                <div className="create-course-modal__image-preview">
                  <img src={previewImage} alt="Предпросмотр" />
                </div>
              )}
            </div>
          </div>

          <div className="create-course-modal__footer">
            <button
              type="button"
              className="create-course-modal__cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="create-course-modal__save"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Создание..." : "Создать курс"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourseModal;
