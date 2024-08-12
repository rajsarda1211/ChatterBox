const express = require('express');
const router = express.Router();
const { login } = require('../controllers/LoginController');
const { signup, allUsers } = require('../controllers/SignUpController');
const { protect } = require('../middleware/authMiddleware')

router.route('/login').post(login);
router.route('/').post(signup).get(protect, allUsers);

module.exports = router;
