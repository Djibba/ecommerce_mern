const router = require('express').Router();

const { createProduct, getProducts, getOneProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.route('/product/create').post(createProduct);
router.route('/product/all').get(getProducts);
router.route('/product/:id').get(getOneProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);

module.exports = router;