import React, { useEffect } from "react";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/actions/postActions";

function Post() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post: post, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  return (
    <div className="course">
      {loading && <p className="loading">Загрузка...</p>}
      {error && <p className="error">Ошибка! {error}</p>}

      {post && (
        <>
          <div className="course__header">
            <h1 className="course__title">{post.title}</h1>
            <p className="course__description">{post.desc}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Обложка курса"
                className="course__cover"
              />
            )}
          </div>
          <p>{post.text}</p>
        </>
      )}
    </div>
  );
}

export default Post;
