const express = require('express');
const { getUsers, getUserById } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getUsers);
router.route('/:id').get(protect, getUserById);

module.exports = router;
