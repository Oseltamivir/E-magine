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
        ws.close(1006, "Connection timed out.");
      }
    }
    else {
      ws.close(1006, "Invalid payload received.");
    }
  }

  /* Process identity opcode sent from client */
  identifyHandler (ws, data) {
    const token = data.token;
    let user = "";

    try {
      user = signer.unsign(token);
    }
    catch (e) {
      // bad token
      ws.close(1003, "Identify failed, invalid token provided.");
    }

    this.clients.set(user, ws);
    ws.user = user;
    sendReady(ws);
  }

  sendHello (ws) {
    const hello = {
      "op": 0,
      "heartbeat_interval": 45000
    }
    ws.send(JSON.stringify(hello));
  }

  sendHeartbeat (ws) {
    const hb = {
      "op": 10,
      "time": Date.now()
    }
    ws.send(JSON.stringify(hb));
  }

  sendHeartbeatACK (ws, data) {
    const hb_ack = {
      "op": 11,
      "time": data.time
    }
    ws.send(JSON.stringify(hb_ack));
  }

  sendReady (ws) {
    const ready = {
      "op": 1,
      "user": ws.user
    }
    ws.send(JSON.stringify(ready));
  }

  sendMessage (ws, message) {
    const msg = {
      "op": 2,
      "message": message
    }
    ws.send(JSON.stringify(msg));
  }
}

module.exports = Gateway;