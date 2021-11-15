'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const capsConnection = io.connect(host);
const driverConnection = io.connect(`${host}/driver-system`);
const vindorConnection = io.connect(`${host}/vendor-system`);

capsConnection.emit('order-info', {
    time: payload.time,
    store: payload.store,
    orderID: payload.orderID,
    customer: payload.customer,
    address: payload.address
});

driverConnection.emit('driver', { orderID: payload.orderID });

vindorConnection.emit('vendor', { orderID: payload.orderID });
