'use strict';

const io = require('socket.io-client');

/* ------ CONNECT ---------- */
const host = 'http://localhost:3000';
const capsConnection = io.connect(`${host}/system`);

/* ------ Listener ---------- */
capsConnection.on('pickedUp', pickedUp);
capsConnection.on('delivered', delivered);

/* ------ Function ---------- */

function pickedUp(payload) {
    console.log(`DRIVER: picked up ${payload.orderID}`);
};

function delivered(payload) {
    console.log(`DRIVER: delivered up ${payload.orderID}`);
};

