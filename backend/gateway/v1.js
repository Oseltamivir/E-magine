const RD = require('reallydangerous');
const signer = new RD.TimestampSigner('my-secret');

class Gateway {
  constructor (wss) {
    this.wss = wss;

    this.clients = new Map();

    this.init();
  }

  init () {
    this.wss.on('connection', this.connectionHandler.bind(this));
  }

  /* Handles incoming connections from gateway clients */
  connectionHandler (ws) {
    this.registerListener(ws);

    this.sendHello(ws);
  }

  /* Listeners for messages and events from client */
  registerListener (ws) {
    ws.on('message', (msg) => this.messageHandler(ws, msg));
    ws.on('close', (e) => {
      ws.closed = true;
    });

    setInterval(() => {
      this.sendHeartbeat(ws);
    }, 45000);
  }

  /* Handles packets/messages received from client */
  messageHandler (ws, msg) {
    const data = JSON.parse(msg);

    const op = data.op;
    if (op == 1) {
      // login and identify user
      this.identifyHandler(ws, data);
    }
    else if (op == 10) {
      // respond with heartbeat ACK
      this.sendHeartbeatACK(ws, data);
    }
    else if (op == 11) {
      // check if ping timed out
      if ((data.time + 45000) < Date.now()) {
        ws.close(4002, "Connection timed out.");
      }
    }
    else {
      ws.close(4001, "Invalid payload received.");
    }
  }

  /* Process identity opcode sent from client */
  identifyHandler (ws, data) {
    const token = data.token;
    let user = "";

    try {
      user = signer.unsign(token);
      user = Buffer.from(user, 'base64').toString();
    }
    catch (e) {
      // bad token
      ws.close(4003, "Identify failed, invalid token provided.");
    }

    const client = new Client(ws, user);
    if (this.clients.has(user)) {
      this.clients.set(user, [...this.clients.get(user), client]);
    }
    else this.clients.set(user, [client]);
    ws.user = user;
    client.sendReady();

    console.log('[GATEWAY] New client connected, ID:', user);
  }

  sendHello (ws) {
    if (ws.closed) return;
    const hello = {
      "op": 0,
      "heartbeat_interval": 45000
    }
    ws.send(JSON.stringify(hello));
  }

  sendHeartbeat (ws) {
    if (ws.closed) return;
    const hb = {
      "op": 10,
      "time": Date.now()
    }
    ws.send(JSON.stringify(hb));
  }

  sendHeartbeatACK (ws, data) {
    if (ws.closed) return;
    const hb_ack = {
      "op": 11,
      "time": data.time
    }
    ws.send(JSON.stringify(hb_ack));
  }
}

class Client {
  constructor (ws, user) {
    this.ws = ws;
    this.user = user;
  }

  sendReady () {
    if (this.ws.closed) return;
    const ready = {
      "op": 2,
      "user": this.user
    }
    this.ws.send(JSON.stringify(ready));
  }

  sendMessage (message) {
    if (this.ws.closed) return;
    const msg = {
      "op": 3,
      "message": message
    }
    this.ws.send(JSON.stringify(msg));
  }
}

module.exports = Gateway;