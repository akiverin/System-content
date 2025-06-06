import React, { useEffect } from "react";
import "./Course.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../redux/actions/courseActions";
import { Link, useParams } from "react-router-dom";
import PostCard from "./PostCard/PostCard";

function Course() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { course, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourse(id));
  }, [dispatch, id]);

  // Функция для рендера каждого типа контента
  const renderContentItem = (item) => {
    switch (item.resourceType) {
      case "Post":
        return (
          <li className="course__item" key={item._id}>
            <Link to={`/courses/${course._id}/${item._id}`}>
              <PostCard
                post={{
                  _id: item._id,
                  type: "post",
                  title: item.title,
                  desc: item.desc,
                }}
              />
            </Link>
          </li>
        );

      case "Video":
        return (
          <li className="course__item" key={item._id}>
            <Link to={`/videos/${item._id}`}>
              <PostCard
                post={{
                  _id: item._id,
                  type: "video",
                  title: item.title,
                  desc: item.desc,
                }}
              />
            </Link>
          </li>
        );

      case "Document":
        return (
          <li className="course__item" key={item._id}>
            {/* Для документа используем обычное <a>, так как ссылка ведет на внешний URL */}
            <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
              <PostCard
                post={{
                  _id: item._id,
                  type: "document",
                  title: item.title,
                  desc: item.desc,
                }}
              />
            </a>
          </li>
        );

      default:
        return null;
    }
  };

  // Сортировка контента по порядку (order)
  const sortedContent = course?.content
    ? [...course.content].sort((a, b) => a.order - b.order)
    : [];

  return (
    <div className="course">
      {loading && <p className="loading">Загрузка...</p>}
      {error && <p className="error">Ошибка! {error}</p>}

      {course && !error && (
        <div className="course__wrapper">
          <div className="course__header">
            <div className="course__info">
              <h1 className="course__title">{course.title}</h1>
              <p className="course__description">{course.desc}</p>
              {course.tags && course.tags.length > 0 && (
                <div className="course-card__tags">
                  {course.tags.map((tag, index) => (
                    <p className="course-card__tag" key={index}>
                      {tag.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {course.image && (
              <img
                src={course.image.url}
                alt="Обложка курса"
                className="course__cover"
              />
            )}
          </div>

          <h2 className="course__subtitle">Материалы курса</h2>
          <ul className="course__list">
            {sortedContent.map((item) => renderContentItem(item))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Course;
