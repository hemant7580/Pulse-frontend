const Post = require('../models/Post');
const mongoose = require('mongoose');

const createPost = async (req, res, next) => {
  try {
    const text = (req.body.text || '').trim();
    const file = req.file;
    if (!text && !file) {
      return res.status(400).json({ message: 'Post must include text or an image' });
    }
    const imagePath = file ? `/uploads/${file.filename}` : null;
    const post = await Post.create({
      userId: req.user.id,
      username: req.user.username,
      text: text || '',
      image: imagePath,
    });
    const populated = await Post.findById(post._id)
      .populate('userId', 'username email')
      .lean();
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'username email')
      .lean();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const toggleLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post id' });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const uid = new mongoose.Types.ObjectId(req.user.id);
    const idx = post.likes.findIndex((l) => l.equals(uid));
    if (idx >= 0) {
      post.likes.splice(idx, 1);
    } else {
      post.likes.push(uid);
    }
    await post.save();
    const updated = await Post.findById(id).populate('userId', 'username email').lean();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const text = (req.body.text || '').trim();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post id' });
    }
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.comments.push({
      userId: req.user.id,
      username: req.user.username,
      text,
      createdAt: new Date(),
    });
    await post.save();
    const updated = await Post.findById(id).populate('userId', 'username email').lean();
    res.status(201).json(updated);
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost, getPosts, toggleLike, addComment };
