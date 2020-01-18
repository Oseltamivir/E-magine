const ws = require('@discordjs/uws').Server;
const server = require('http').createServer();

const app = require('./app');
const Gateway = require('./gateway/v1');

const wss = new ws({ server });
const gateway = new Gateway(wss);

app.set('gateway', gateway);
server.on('request', app);

server.listen(8080, () => console.log('[LOG] Backend server is ready'));