const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/product.controller');
router.route('/')
.get(productControllers.getProducts)
.post(productControllers.createProduct)

router.route('/bulk-update').patch(productControllers.bulkUpdateProductById);

router.route('/:id')
.patch(productControllers.updateProductById)
.delete(productControllers.deleteProductById)



module.exports= router;