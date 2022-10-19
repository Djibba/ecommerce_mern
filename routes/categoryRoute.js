const router = require('express').Router();

const { createCategory, getCategories, getOneCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');


router.route('/category').get(getCategories);
router.route('/category/create').post(auth, authAdmin, createCategory);
router.route('/category/:id').delete(auth, authAdmin, deleteCategory);
router.route('/category/:id').put(auth, authAdmin, updateCategory);

module.exports = router;