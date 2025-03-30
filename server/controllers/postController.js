const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "-password");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("author", "-password");
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePostById = async (req, res) => {
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

exports.createPost = async (req, res) => {
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

exports.updatePostById = async (req, res) => {
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
