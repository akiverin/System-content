import React, { useEffect } from "react";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../redux/actions/postActions";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function Post() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, loading, error } = useSelector((state) => state.post);

  // Инициализация редактора с отключенной возможностью редактирования
  const editor = useEditor({
    content: post ? post.text : "", // Если post.text уже является TipTap JSON, передаём его напрямую
    extensions: [StarterKit],
    editable: false,
  });

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  // Обновляем содержимое редактора, когда пост получен или обновился
  useEffect(() => {
    if (post && editor) {
      editor.commands.setContent(post.text);
    }
  }, [post, editor]);

  return (
    <div className="post">
      {loading && <p className="loading">Загрузка...</p>}
      {error && <p className="error">Ошибка! {error}</p>}

      {post && (
        <>
          <div className="post__header">
            <button className="post__back" onClick={() => navigate(-1)}>
              ← Вернуться назад
            </button>
            <h1 className="post__title">{post.title}</h1>
            {post.image && (
              <img
                src={post.image}
                alt="Обложка поста"
                className="post__cover"
              />
            )}
          </div>
          {/* Рендер содержимого, полученного из richtext в формате JSON */}
          {editor && <EditorContent editor={editor} />}
        </>
      )}
    </div>
  );
}

export default Post;
