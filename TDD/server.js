const express = require('express');

const PORT = 3333;
const app = express();
const productRoutes = require('./routes/routes');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose
  .connect(`${process.env.MONGO_DB_URL}`, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Mongodb connected...'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT);

console.log(`Running on port ${PORT}`);
