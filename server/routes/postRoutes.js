const express = require('express');
const auth = require('../middleware/auth');
const { uploadPostImage } = require('../config/multer');
const {
  createPost,
  getPosts,
  toggleLike,
  addComment,
} = require('../controllers/postController');

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, uploadPostImage.single('image'), createPost);
router.put('/:id/like', auth, toggleLike);
router.post('/:id/comment', auth, addComment);

module.exports = router;
