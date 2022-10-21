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
    const result = await Product.updateOne({ _id: id }, { $set: data }, {runValidators: true});
}

exports.bulkUpdateProductService = async (data) => {
    // {
    //     "ids": ["6350b614b549e96c939ef9fe", "6350b63cb549e96c939efa00"],
    //     "data": {
    //       "price": 334
    //     }
    //   }

    // const result = await Product.updateMany({_id: data.ids},data.data, { runValidators: true });

    // Update one by one all product
    // {
    //     "ids": [
    //       {
    //         "id": "6350b63cb549e96c939efa00",
    //         "data": {
    //           "price": 450
    //         }
    //       },
    //       {
    //         "id": "6350b614b549e96c939ef9fe",
    //         "data": {
    //           "price": 50
    //         }
    //       }
    //     ]
    //   }
    const products = [];
    data.ids.forEach(product => {
        products.push((Product.updateOne({_id: product.id}, product.data)));
    })
    const result = await Promise.all(products);
    return result;
}

exports.deleteProductService = async (id) => {
    const result = await Product.deleteOne({_id: id})
    return result;
}