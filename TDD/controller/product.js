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
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) res.status(200).json(product);
    else res.status(404).send();
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );

    if (updatedProduct) res.status(200).json(updatedProduct);
    else res.status(404).send();
  } catch (error) {
    next(error);
  }
};
