import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "-password");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("author", "-password");
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    const processedText = post.text
      .replace(/\\r\\n/g, "\n") // Windows-style переносы
      .replace(/\\n/g, "\n") // Экранированные переносы
      .replace(/\r\n/g, "\n"); // Нативные переносы
    res.json({
      ...post.toObject(),
      text: processedText,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    if (req.user.role !== "admin" && req.user.id !== post.author) {
      return res.status(403).json({ message: "Нет доступа" });
    }
    const deletedPost = await Post.findOneAndDelete(postId);
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const ctx = req.body;
    const newPost = new Post({
      title: ctx.title,
      desc: ctx.desc,
      image: ctx.image,
      text: ctx.text,
      tags: ctx.tags,
      author: req.user.id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const ctx = req.body;
    const updPost = {
      title: ctx.title,
      desc: ctx.desc,
      image: ctx.image,
      text: ctx.text,
      tags: ctx.tags,
    };
    const post = await Post.updateOne({ _id: postId }, updPost);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
