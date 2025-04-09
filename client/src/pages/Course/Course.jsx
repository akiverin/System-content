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

  // Фильтруем только посты и преобразуем данные для PostCard
  const coursePosts =
    course?.content
      ?.filter((item) => item.resourceType === "Post")
      .map((post) => ({
        _id: post.resourceId._id,
        title: post.resourceId.title,
        desc: post.resourceId.desc,
        tags: post.resourceId.tags,
        image: post.resourceId.image,
        createdAt: post.resourceId.createdAt,
      })) || [];

  return (
    <div className="course">
      {loading && <p className="loading">Загрузка...</p>}
      {error && <p className="error">Ошибка! {error}</p>}

      {course && !error && (
        <>
          <div className="course__header">
            <div className="course__info">
              <h1 className="course__title">{course.title}</h1>
              <p className="course__description">{course.desc}</p>
              {course.tags && !!course.tags.length && (
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
            {coursePosts.map((post) => (
              <li className="course__item" key={post._id}>
                <Link to={`/courses/${course._id}/${post._id}`}>
                  <PostCard post={post} />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Course;
