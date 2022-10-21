const Product = require("../models/Product")

exports.getProductsServices = async () => {
    const products = await Product.find({})
    return products;
}

exports.createProductService = async (data) => {

    const product = await Product.create(data);
    return product;
}

exports.updateProductService = async (id, data) => {
    const result = await Product.updateOne({ _id: id }, { $set: data });
}