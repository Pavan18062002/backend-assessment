const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate('author', 'name email');
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name email');
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  const blog = new Blog({
    title,
    content,
    author: req.user._id,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
};

exports.updateBlog = async (req, res) => {
  const { title, content } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.content = content;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.remove();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

exports.getFilteredBlogs = async (req, res) => {
  const { title, author } = req.query;
  const query = {};
  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }
  if (author) {
    const authorUser = await User.findOne({ name: author });
    if (authorUser) {
      query.author = authorUser._id;
    }
  }
  const blogs = await Blog.find(query).populate('author', 'name email');
  res.json(blogs);
};
