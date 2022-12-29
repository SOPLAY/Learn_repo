const productModel = require('../models/Product');

exports.createProduct = async (req, res, next) => {
  try {
    const createedProduct = await productModel.create(req.body);
    console.log('createedProduct', createedProduct);
    res.status(201).json(createedProduct);
  } catch (error) {
    next(error);
  }
};
