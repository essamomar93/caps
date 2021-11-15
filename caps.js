'use strict';

const PORT = process.env.PORT || 3000;

const caps = require('socket.io')(PORT);

const driverSystem = caps.of('/driver-system');
const vendorSystem = caps.of('/vendor-system');


caps.on('connection', (socket) => {
  // console.log('CONNECTED', socket.id);
  socket.on('order-info', (payload) => {

    caps.emit('pickup', payload);

    caps.emit('in_transit', payload);

    caps.emit('deleverd', payload);

  });
});


driverSystem.on('connection', (socket) => {
  // console.log('HEALTHCARE CONNECTED', socket.id);
  socket.on('driver', (payload) => {
    // console.log('I got here from the fire event');
    driverSystem.emit('pickedUp', payload);

  });
});

vendorSystem.on('connection', (socket) => {
  // console.log('DIGESTIVE SYSTEM CONNECTED', socket.id);
  socket.on('vendor', (payload) => {
    // console.log('I got the food from fire event');
    vendorSystem.emit('delivering', payload);

  });
});
