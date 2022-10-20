const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/product.controller');
router.route('/')
.get(productControllers.getProducts)
.post(productControllers.createProduct)

module.exports= router;