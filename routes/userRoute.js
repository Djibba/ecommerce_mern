const router = require('express').Router()
const auth = require('../middlewares/auth');

const { login, register, refreshToken, logout, getUser } = require('../controllers/userController');

router.post('/user/register', register);
router.post('/user/login', login);
router.get('/user/logout', logout);
router.get('/user/refresh_token', refreshToken);
router.get('/user/infos', auth, getUser);

module.exports = router;
