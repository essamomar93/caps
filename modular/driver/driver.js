'use strict';

const io = require('socket.io-client');

/* ------ CONNECT ---------- */
const host = 'http://localhost:3000';
const capsConnection = io.connect(host);
const driverPickedUp = io.connect(`${host}/driver-system`);

/* ------ Listener ---------- */
capsConnection.on('in_transit', in_transit);
driverPickedUp.on('pickedUp', pickedUp);

/* ------ Event Handler ---------- */
function in_transit(payload) {
  setTimeout(()=>{
    console.log("EVENT",` event: 'in_transit',
    time:${payload.time},
    payload: {
    store: ${payload.store},
    orderID: ${payload.orderID},
    customer: ${payload.customer},
    address: ${payload.address},`);
},1000)
};


function pickedUp(payload) {
  setTimeout(()=>{
    console.log(`DRIVER: picked up ${payload.orderID}`);
  },1500)
  setTimeout(()=>{
    console.log(`DRIVER: delivered up ${payload.orderID}`);
  },2750)
};
