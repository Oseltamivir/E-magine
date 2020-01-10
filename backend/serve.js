const express = require('express');
const app = express();

const apiv1 = require('./api/v1');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.use('/api/v1', apiv1);

app.listen(8080, () => console.log('Backend server is ready'));