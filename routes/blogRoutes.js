const express = require('express');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getFilteredBlogs,
} = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(getBlogs).post(protect, createBlog);
router.route('/filter').get(getFilteredBlogs);
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
