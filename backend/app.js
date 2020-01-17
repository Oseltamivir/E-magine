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

console.log('[LOG] Registering default api version to 1');
app.use('/api', apiv1);

module.exports = app;