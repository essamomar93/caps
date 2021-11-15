'use strict';

const PORT = process.env.PORT || 3000;

const caps = require('socket.io')(PORT);

const capsConnection = caps.of('/system');

capsConnection.on('connection', (socket) => {
  console.log('CONNECTED', socket.id);
  socket.on("pickup", (payload) => {
    console.log(`---------------------------------`);
    console.log("EVENT", {
      event: 'pickup',
      payload: payload,
    });
    capsConnection.emit('pickedUp', payload)
  });

  socket.on('pickup', (payload) => {
    console.log("EVENT", {
      event: 'in_transit',
      payload: payload,
    });

    capsConnection.emit('delivered', payload)
  });

  socket.on('pickup', (payload) => {
    console.log("EVENT", {
      event: 'deleverd',
      payload: payload,
    });
    console.log(`---------------------------------`);

    capsConnection.emit('delivering', payload)
  });

});
