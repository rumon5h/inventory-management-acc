const Product = require("../models/Product");
const {
  getProductsServices,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductService,
  bulkDeleteProductService
} = require("../services/product.services");
exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductsServices();

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
};

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
      message: "Data is not inserted.",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
   const result = await updateProductService(id, req.body)
   res.status(200).json({
    status: "success",
         message: "Data updated successfully.",
         data: result
   })
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Couldn't update the product.",
      error: error.message,
    });
  }
};


exports.bulkUpdateProductById = async (req, res, next) => {
  try {
   const result = await bulkUpdateProductService(req.body)
   res.status(200).json({
    status: "success",
         message: "Data updated successfully.",
         data: result
   })
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Couldn't update the product.",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const {id} = req.params;
   const result = await deleteProductService(id)
   res.status(200).json({
    status: "success",
         message: "Successfully deleted product.",
         data: result
   })
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Couldn't delete  the product.",
      error: error.message,
    });
  }
};

exports.bulkDeleteProductById = async (req, res, next) => {
  try {
    
   const result = await bulkDeleteProductService(req.body.ids)
   res.status(200).json({
    status: "success",
         message: "Data updated successfully.",
         data: result
   })
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Couldn't update the product.",
      error: error.message,
    });
  }
};