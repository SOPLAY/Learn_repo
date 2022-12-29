const request = require('supertest');
const { app, server } = require('../../server');
const newProductData = require('../data/new-product.json');
const { default: mongoose } = require('mongoose');

it('POST /api/products', async () => {
  const response = await request(app)
    .post('/api/products')
    .send(newProductData);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProductData.name);
  expect(response.body.description).toBe(newProductData.description);
});
