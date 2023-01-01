const request = require('supertest');
const { app, server } = require('../../server');
const newProductData = require('../data/new-product.json');
const { default: mongoose } = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

let firstProduct;

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

it('GET /api/products', async () => {
  const res = await request(app).get('/api/products');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBeTruthy();
  expect(res.body[0].name).toBeDefined();
  expect(res.body[0].description).toBeDefined();
  firstProduct = res.body[0];
});

it('GET /api/products/:productId', async () => {
  const res = await request(app).get(`/api/products/${firstProduct._id}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe(firstProduct.name);
  expect(res.body.description).toBe(firstProduct.description);
  expect(res.body.price).toBe(firstProduct.price);
});

it('GET id doenst exist /api/products/:productId ', async () => {
  //이상한 productId 값일 때
  const res = await request(app).get(`/api/products/63ac5fef30fed75cf154f093`);
  expect(res.statusCode).toBe(404);
});

it('PUT /api/products/:productId', async () => {
  const res = await request(app)
    .put(`/api/products/${firstProduct._id}`)
    .send({ name: 'updated name', description: 'updated description' });

  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe('updated name');
  expect(res.body.description).toBe('updated description');
});

it('should return 404 on PUT /api/products', async () => {
  const res = await request(app)
    .put(`/api/products/63ac5fef30fed75cf154f019`)
    .send({ name: 'updated name', description: 'updated description' });
  expect(res.statusCode).toBe(404);
});
