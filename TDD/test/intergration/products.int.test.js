const request = require('supertest');
const { app, server } = require('../../server');
const newProductData = require('../data/new-product.json');
const { default: mongoose } = require('mongoose');

afterEach(async () => {
  await mongoose.connection.close();
  server.close();
});

it('POST /api/products', async () => {
  const res = await request(app).post('/api/products').send(newProductData);
  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe(newProductData.name);
  expect(res.body.description).toBe(newProductData.description);
});

it('should return 500 on POST /api/products', async () => {
  const res = await request(app).post('/api/products').send({ name: 'phone' });
  expect(res.statusCode).toBe(500);
  expect(res.body).toStrictEqual({
    message:
      'Product validation failed: description: Path `description` is required.',
  });
});
