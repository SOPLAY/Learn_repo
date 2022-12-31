const productModel = require('../models/Product');

exports.createProduct = async (req, res, next) => {
  try {
    const createedProduct = await productModel.create(req.body);
    // console.log('createedProduct', createedProduct);
    res.status(201).json(createedProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  const allProducts = await productModel.find({});
  res.status(200).json(allProducts);
};
