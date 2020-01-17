class Gateway {
  constructor (wss) {
    this.wss = wss;

    this.clients = new Map();

    this.init();
  }

  init () {
    this.wss.on('connection', this.connectionHandler.bind(this));
  }

  connectionHandler (ws) {
    this.registerListener(ws);

    this.sendHello(ws);
  }

  registerListener (ws) {
    ws.on('message', (msg) => this.messageHandler(ws, msg));

    setInterval(() => {
      this.sendHeartbeat(ws);
    }, 45000);
  }

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

  identifyHandler (ws, data) {
    // TODO
  }
}

module.exports = Gateway;