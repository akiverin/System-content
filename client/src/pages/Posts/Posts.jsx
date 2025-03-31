import React, { useEffect } from "react";
import "./Posts.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/actions/postActions";
import { Link } from "react-router-dom";
import PostCard from "./PostCard/PostCard";

function Posts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const {
    allPosts: posts,
    loading,
    error,
  } = useSelector((state) => state.post);
  return (
    <div>
      <h1>Курсы и материалы</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка! {error}</p>}
      <ul className="posts__list">
        {posts?.map((post) => (
          <li className="posts__item" key={post._id}>
            <Link to={`/posts/${post._id}`}>
              <PostCard
                title={post.title}
                desc={post.desc}
                tags={post.tags}
                image={post.image}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
