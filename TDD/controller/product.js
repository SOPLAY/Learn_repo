const productModel = require('../models/Product');

exports.createProduct = (req, res, next) => {
  const createedProduct = productModel.create(req.body);
  res.status(201).json(createedProduct);
};
