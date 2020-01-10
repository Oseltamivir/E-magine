const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.listen(8080, () => console.log('Backend server is ready'));