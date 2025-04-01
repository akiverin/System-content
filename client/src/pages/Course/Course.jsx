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
    <div className="course-page">
      {loading && <p className="loading">Загрузка...</p>}
      {error && <p className="error">Ошибка! {error}</p>}

      {course && (
        <>
          <div className="course-header">
            <h1 className="course-title">{course.title}</h1>
            <p className="course-description">{course.desc}</p>
            {course.image && (
              <img
                src={course.image}
                alt="Обложка курса"
                className="course-cover"
              />
            )}
          </div>

          <h2 className="posts-section-title">Материалы курса</h2>
          <div className="posts-grid">
            {coursePosts.map((post) => (
              <div className="post-card-wrapper" key={post._id}>
                <Link to={`/posts/${post._id}`}>
                  <PostCard
                    title={post.title}
                    desc={post.desc}
                    tags={post.tags}
                    image={post.image}
                  />
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Course;
