const Product = require('../models/Product');
const { getProductsServices, createProductService } = require('../services/product.services');
exports.getProducts = async (req, res, next) => {
    try {
      const products = await getProductsServices()
  
      res.status(200).json({
        status: "success",
        message: "Data fetched successfully.",
        data: products,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }


exports.createProduct = async (req, res, next) => {
    try {
      // Save and create
      const result = await createProductService(req.body);
  
    //   const product = new Product(req.body);
    //   if(product.quantity == 0){
    //       product.status = 'out-of-stock';
    //   }
    //   const result = await product.save()
  
      res.status(200).json({
        status: "success",
        message: "Data inserted successfully.",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }