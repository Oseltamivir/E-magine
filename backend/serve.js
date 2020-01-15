const express = require('express');
const app = express();

const apiv1 = require('./api/v1');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} - ${req.url}`);
  next();
});

console.log('[LOG] Loading v1 API');
app.use('/api/v1', apiv1);

app.listen(8080, () => console.log('[LOG] Backend server is ready'));