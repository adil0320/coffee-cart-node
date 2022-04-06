const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const app = express();

const userRoutes = require('./router/user');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  next();
});

app.use('/api/users', userRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(
    app.listen(port, () => {
      console.log('Server running on port ' + port);
    })
  )
  .catch(err => console.log(err.message));
